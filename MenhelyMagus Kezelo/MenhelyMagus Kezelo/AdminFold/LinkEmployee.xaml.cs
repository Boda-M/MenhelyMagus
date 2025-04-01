using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Windows;
using System.Windows.Controls;
using MenhelyMagus_Kezelo.Classes;

namespace MenhelyMagus_Kezelo.AdminFold
{
    public partial class LinkEmployee : UserControl
    {
        Employee old;
        public LinkEmployee(Employee old)
        {
            InitializeComponent();
            
            this.old = old;
            Email.Text = old.Email;
            Name.Text = old.Name;
            
            ShelterId.Text = old.ShelterId_str;
        }
        private async void Edit_Click(object sender, EventArgs e)
        {
            if (IsValid())
            {
                JsonSerializerOptions jsonoptions = new JsonSerializerOptions { DefaultIgnoreCondition = System.Text.Json.Serialization.JsonIgnoreCondition.WhenWritingNull }; //make sure null works properly
                var edited = new Dictionary<string, object>
                    {
                        {"shelterId", int.TryParse(ShelterId.Text, out var newid) ? (int?)newid : null}
                    };
                JsonElement response = await ApiService.PutAsync($"employees/{old.Id}", JsonSerializer.Serialize(edited,jsonoptions));
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        App.MainAppWindow.ShowSuccess("Menhely sikeresen megváltoztatva.");
                        MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                        mainWindow.MainContent.Content = new ListEmployees();
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: változtatás sikertelen. \n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        private bool IsValid()
        {
            if (ShelterInformation.Text == "ilyen menhely nem létezik")
            {
                App.MainAppWindow.ShowError("A megadott azonosítójú menhely nem létezik");
                return false;
            }
            else if (old.ShelterId_str == ShelterId.Text|| (string.IsNullOrEmpty(ShelterId.Text)&&old.ShelterId_str==null))
            {
                App.MainAppWindow.ShowError("A menhely aznonosítója nem lett megváltoztatva");
                return false;
            }
            return true;
        }
        private void Cancel(object sender, EventArgs e)
        {
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new ListEmployees();
        }
        private async void ShelterPreview(object sender, EventArgs e)
        {
            if (int.TryParse(ShelterId.Text, out int id))
            {
                Shelter shelter = await ApiService.GetOne<Shelter>($"shelters/{id}");
                if (shelter != default(Shelter))
                {
                    ShelterInformation.Text = shelter.ShortInfo();
                }
                else
                {
                    ShelterInformation.Text = "ilyen menhely nem létezik";
                }
            }
            else if (string.IsNullOrEmpty(ShelterId.Text)) { ShelterInformation.Text = ""; } //no input ==> employee has no shelter
            else ShelterInformation.Text = "ilyen menhely nem létezik";//invalid input
        }
    }
}
