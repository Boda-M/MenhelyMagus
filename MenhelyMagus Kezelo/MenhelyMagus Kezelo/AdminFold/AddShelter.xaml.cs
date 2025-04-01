using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using System.Threading.Tasks;

namespace MenhelyMagus_Kezelo.AdminFold
{
    public partial class AddShelter : UserControl
    {
        public AddShelter()
        {
            InitializeComponent();
        }

        private async void Add_Click(object sender, EventArgs e)
        {
            if (IsFilled() && await IsValid())
            {
                var shelter = new Dictionary<string, object>
                {
                    {"name",Name.Text },
                    {"email",Email.Text },
                    {"telephoneNumber",PhoneNumber.Number.Text }, 
                    {"city",City.Text},
                    {"street",Street.Text },
                    {"houseNumber",HouseNumber.Text}
                };
                string jsonString=JsonSerializer.Serialize(shelter);

                JsonElement response = await ApiService.PostAsync("shelters", jsonString);
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 201)
                    {
                        App.MainAppWindow.ShowSuccess("Menhely sikeresen létrehozva.");
                        MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                        mainWindow.MainContent.Content = new AddShelter();
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: létrehozás sikertelen. \n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }

        }
        private bool IsFilled()
        {
            string errorMessage = "Kérem töltse ki a következő mezőket:\n";

            if (Name.Text == "Név" || string.IsNullOrWhiteSpace(Name.Text))
            {
                errorMessage += "- Név\n";
            }
            if (Email.Text == "Email" || string.IsNullOrWhiteSpace(Email.Text))
            {
                errorMessage += "- Email\n";
            }
            if (PhoneNumber.Number.Text == "Telefonszám" || string.IsNullOrWhiteSpace(PhoneNumber.Number.Text))
            {
                errorMessage += "- Telefonszám\n";
            }
            if (City.Text == "Város" || string.IsNullOrWhiteSpace(City.Text))
            {
                errorMessage += "- Város\n";
            }
            if (Street.Text == "Utca" || string.IsNullOrWhiteSpace(Street.Text))
            {
                errorMessage += "- Utca\n";
            }
            if (HouseNumber.Text == "Házszám" || string.IsNullOrWhiteSpace(HouseNumber.Text))
            {
                errorMessage += "- Házszám\n";
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
            bool valid = false;
            if (!Email.Text.Contains('@') || !Email.Text.Contains('.'))
            {
                App.MainAppWindow.ShowError("Adjon meg szabályos emailt (tartalmazzon @ és . jeleket)");
            }
            else
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

            return valid; 
        }
    }
}
