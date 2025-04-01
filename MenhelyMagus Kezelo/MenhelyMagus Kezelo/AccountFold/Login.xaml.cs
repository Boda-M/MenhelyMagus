using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using MenhelyMagus_Kezelo.Classes;

namespace MenhelyMagus_Kezelo.AccountFold
{
    public partial class Login : UserControl
    {
        public Login()
        {
            InitializeComponent();
        }
        public void Register_Redirect_Click(Object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new Register();
        }

        private async void Login_Click(object sender, RoutedEventArgs e)
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
                    App.Current.Properties["tokenSTR"] = response.GetProperty("data").GetProperty("new").ToString();
                    string usertype = await MainWindow.getUserType();
                    if (usertype == "user")
                    {
                        App.MainAppWindow.ShowError("Ez az alkalamazás nem támogatja a felhasználói fiókokat.\nJelentkezzen be admin/vagy alkalmazotti fiókkal.");
                    }
                    else
                    {
                        SuccessfulLogin(usertype == "admin");
                    }

                }
                else if (code.ToString() == "400") //expected error
                {
                    App.MainAppWindow.ShowError("Sikertelen bejelentkezés. \nKérem ellenőrizze a megadott e-mailt és jelszót.");
                }
                else //unexpected error
                {
                    App.MainAppWindow.ShowError($"Hiba: Sikertelen bejelentkezés. \n{code.ToString()}: {message.ToString()}");
                }
            }
            else { App.MainAppWindow.ServerError(); }
        }

        public async static void SuccessfulLogin(bool admin, bool register = false)
        { //if admin==false --> an employee logged in
            MenuItem adminMenuItem = (MenuItem)Application.Current.MainWindow.FindName("admin_menu");
            MenuItem employeeMenuItem = (MenuItem)Application.Current.MainWindow.FindName("employee_menu");

            adminMenuItem.IsEnabled = admin;
            adminMenuItem.Foreground = admin ? Brushes.White : Brushes.Gray;
            employeeMenuItem.IsEnabled = !admin;
            employeeMenuItem.Foreground = !admin ? Brushes.White : Brushes.Gray;

            ((MenuItem)Application.Current.MainWindow.FindName("logout_menu")).IsEnabled = true;
            ((MenuItem)Application.Current.MainWindow.FindName("deleteaccount")).IsEnabled = true;
            ((MenuItem)Application.Current.MainWindow.FindName("change_credentials_menu")).IsEnabled = true;
            ((MenuItem)Application.Current.MainWindow.FindName("login_menu")).IsEnabled = false;
            ((MenuItem)Application.Current.MainWindow.FindName("register_menu")).IsEnabled = false;

            if (register)//register auto logs you in--> one feedback is enough
            {
                App.MainAppWindow.ShowSuccess("Sikeres regisztráció");
            }
            else { App.MainAppWindow.ShowSuccess("Sikeres bejelentkezés"); }

            MainWindow mainWindow = Application.Current.MainWindow as MainWindow;
            mainWindow.MainContent.Content = null;

            if (!admin)
            {
                Token token = await MainWindow.checkToken();
                Employee current = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");
                if (current.ShelterId == -1)
                {
                    Label label = new Label();
                    label.Content = "Még nincsen menhelye!\nKérjük várja meg amíg egy adminisztrátorunk beállít egyet!";
                    label.Foreground = Brushes.White;
                    label.HorizontalAlignment = HorizontalAlignment.Center;
                    label.VerticalAlignment = VerticalAlignment.Center;
                    label.FontSize = 20;
                    label.FontWeight = FontWeights.Bold;
                    mainWindow.MainContent.Content = label;
                }

                mainWindow.adminArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
                mainWindow.adminIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/adminIconGray.ico"));

                mainWindow.employeeArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrow.ico"));
                mainWindow.employeeIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/employeeIcon.ico"));
            }
            else
            {
                mainWindow.adminArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrow.ico"));
                mainWindow.adminIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/adminIcon.ico"));

                mainWindow.employeeArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
                mainWindow.employeeIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/employeeIconGray.ico"));
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
