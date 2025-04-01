using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using MenhelyMagus_Kezelo.Classes;

namespace MenhelyMagus_Kezelo.AccountFold
{
    public partial class ChangeCredentials : UserControl
    {
        Token token;
        string oldemail; //needed, because we dont know if old is admin or employee
        
        public ChangeCredentials(){
            InitializeComponent();

            _ = InitializeAsync();
        }
        private async Task InitializeAsync()
        {
            token = (await MainWindow.checkToken());
            if (token.UserType == "NLI" || token.UserType == "user")
            {
                MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                mainWindow.MainContent.Content = null;
                App.MainAppWindow.ShowError("Hozzáférés megtagadva");
            }
            else if(token.UserType == "employee")
            {
                Employee old = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");
                Name.Text=old.Name;
                Email.Text = old.Email; oldemail = old.Email;
            }
            else if (token.UserType == "admin")
            {
                Admin old = await ApiService.GetOne<Admin>($"admins/{token.UserId}/{token.TokenSTR}");
                Name.Text = old.Name;
                Email.Text = old.Email;oldemail = old.Email;
            }
        }

        private async void Edit_Click(object sender, RoutedEventArgs e) {
            if (IsFilled() && await IsValid())
            {
                if (await App.MainAppWindow.ShowConfirmationPopup("Adatmódosítás", "Biztosan módosítani szeretné személyes adatait?"))
                {
                    var edited = new Dictionary<string, object>
                    {
                        {"name",Name.Text },
                        {"email",Email.Text },
                        {"passwordHash",Password.Password}
                    };
                    //if no new password is set, the old one is used
                    if (Password.Password == "")
                    {
                        edited = new Dictionary<string, object>
                    {
                        {"name",Name.Text },
                        {"email",Email.Text },
                    };
                    }
                    JsonElement response = await ApiService.PutAsync($"{token.UserType}s/{token.UserId}", JsonSerializer.Serialize(edited));
                    if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                    {
                        if (code.ToString() == "200")
                        {
                            App.MainAppWindow.ShowSuccess($"Sikeres módosítás.");
                            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                            mainWindow.MainContent.Content = null;
                        }
                        else
                        {
                            App.MainAppWindow.ShowError($"Hiba: változtatás sikertelen \n{code.ToString()}: {message.ToString()}");
                        }
                    }
                    else App.MainAppWindow.ServerError();
                }
            }
        }
        private bool IsFilled()
        {
            bool filled = true;
            if ((string.IsNullOrEmpty(Email.Text) || string.IsNullOrEmpty(Name.Text)))
            {
                filled = false;
                App.MainAppWindow.ShowError("Kérem töltse ki a mezőket");
            }
            return filled;
        }
        private async Task<bool> IsValid()
        {
            bool valid = false;
            if (!Email.Text.Contains('@') || !Email.Text.Contains('.')) 
            {
                App.MainAppWindow.ShowError("Adjon meg szabályos emailt (tartalmazzon @ és . jeleket)");
            }
            else if (Email.Text != oldemail)
            {
                var body = new Dictionary<string, object>
                {
                    {"email",Email.Text }
                };
                string jsonString = JsonSerializer.Serialize(body);
                JsonElement response = await ApiService.PostAsync("email", jsonString);
                bool exists = response.GetProperty("data")[0].GetBoolean();
                if (exists)
                {
                    App.MainAppWindow.ShowError("Az email cím már használatban van!");
                }
                else
                {
                    valid = true;
                }
            }
            else {valid = true; }

            return valid;
        }
        private void TogglePass(object sender, MouseButtonEventArgs e)
        {
            if (Password.Visibility == Visibility.Visible)
            {
                Password.Visibility = Visibility.Collapsed;
                PasswordTextBox.Visibility = Visibility.Visible;

                PasswordTextBox.Text = Password.Password;
                hidePassIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/eyeOpened.png"));
            }
            else
            {
                PasswordTextBox.Visibility = Visibility.Collapsed;
                Password.Visibility = Visibility.Visible;

                Password.Password = PasswordTextBox.Text;
                hidePassIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/eyeClosed.png"));
            }
        }
    }
}
