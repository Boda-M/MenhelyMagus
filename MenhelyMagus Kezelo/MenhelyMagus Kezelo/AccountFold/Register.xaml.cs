using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;

namespace MenhelyMagus_Kezelo.AccountFold
{
    /// <summary>
    /// Interaction logic for Register.xaml
    /// </summary>
    public partial class Register : UserControl
    {
        public Register()
        {
            InitializeComponent();
        }

        public void Login_Redirect_Click(Object sender, RoutedEventArgs e)
        {
            this.Content = new Login();
        }

        private async void Register_Click(object sender, RoutedEventArgs e)
        {
            if (IsFilled() && await IsValid())
            {
                var employee = new Dictionary<string, object>
                {
                    {"name",Name.Text },
                    {"email",Email.Text },
                    {"passwordHash",Password.Password }, 
                };
                string jsonString = JsonSerializer.Serialize(employee);

                JsonElement response = await ApiService.PostAsync("employees", jsonString);
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    
                    if (code.ToString() == "201")
                    {
                        Login_();
                    }
                    else App.MainAppWindow.ShowError($"Hibába ütköztünk:\n{code.ToString()}: {message.ToString()}");
                }
                else App.MainAppWindow.ServerError();

            }
        }
        public bool IsFilled()
        {
            string errorMessage = "Kérem töltse ki a következő mezőket:\n";

            if (Name.Text == "")
            {
                errorMessage += "- Név\n";
            }
            if (Email.Text == "")
            {
                errorMessage += "- Email\n";
            }
            if (string.IsNullOrWhiteSpace(Password.Password))
            {
                errorMessage += "- Jelszó\n";
            }

            if (errorMessage != "Kérem töltse ki a következő mezőket:\n")
            {
                App.MainAppWindow.ShowError(errorMessage.TrimEnd());
                return false;
            }
            return true;
        }
        private async Task<bool> IsValid()
        {
            bool valid = true;
            if (!Email.Text.Contains('@') || !Email.Text.Contains('.'))
            {
                valid = false;
                App.MainAppWindow.ShowError("Adjon meg szabályos emailt (tartalmazzon @ és . jeleket)"); 
            }
            else
            {
                var body = new Dictionary<string, object>
                {
                    {"email",Email.Text }
                };
                string jsonString = JsonSerializer.Serialize(body);
                JsonElement response= await ApiService.PostAsync("email", jsonString);
                bool exists = response.GetProperty("data")[0].GetBoolean();
                if (exists)
                {
                    valid = false;
                    App.MainAppWindow.ShowError("Az email cím már használatban van!");
                }
            }
            return valid;
        }
        private async void Login_()
        {
            var employee = new Dictionary<string, object>
            {
                {"email",Email.Text },
                {"password",Password.Password }, 
            };
            string jsonString = JsonSerializer.Serialize(employee);
            JsonElement response = await ApiService.PostAsync("login", jsonString);
            if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
            {
                if (code.ToString() == "200")
                {
                    App.Current.Properties["tokenSTR"] = response.GetProperty("data").GetProperty("new");
                    Login.SuccessfulLogin(false);
                }
            }
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
