using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using MenhelyMagus_Kezelo.EmployeeFold;

namespace MenhelyMagus_Kezelo.AdminFold
{
    public partial class AddAdmin : UserControl
    {
        public AddAdmin()
        {
            InitializeComponent();
        }
        private async void Add_Click(object sender, EventArgs e)
        {
            if(IsFilled() && await IsValid())
            {
                var admin = new Dictionary<string, object>
                {
                    {"name",Name.Text },
                    {"email",Email.Text },
                    {"passwordHash",Password.Password }, 
                };
                string jsonString = JsonSerializer.Serialize(admin);

                JsonElement response = await ApiService.PostAsync("admins", jsonString);
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 201)
                    {
                        App.MainAppWindow.ShowSuccess("Sikeres létrehozás. Az adminisztrátor lehetőleg változtassa meg a jelszavát bejelentkezéskor");
                        MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                        mainWindow.MainContent.Content = new AddAdmin();
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: sikertelen létrehozás. \n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        private bool IsFilled()
        {
            string errorMessage = "Kérem töltse ki a következő mezőket:\n";

            if (string.IsNullOrWhiteSpace(Name.Text))
            {
                errorMessage += "- Név\n";
            }
            if (string.IsNullOrWhiteSpace(Email.Text))
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
                JsonElement response = await ApiService.PostAsync("email", jsonString); //post, because we cant send and email (@) in a get request
                bool exists = response.GetProperty("data")[0].GetBoolean();
                if (exists)
                {
                    valid = false;
                    App.MainAppWindow.ShowError("Az email cím már használatban van!");
                }
            }
            return valid;
        }
    }
}
