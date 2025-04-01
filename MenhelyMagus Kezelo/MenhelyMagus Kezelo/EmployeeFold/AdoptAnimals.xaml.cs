using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using MenhelyMagus_Kezelo.Classes;

namespace MenhelyMagus_Kezelo.EmployeeFold
{
    public partial class AdoptAnimals : UserControl
    {
        ObservableCollection<Adoption> adoptions;
        Token token;
        Employee current;
        public AdoptAnimals()
        {
            InitializeComponent();
            _ = Query();
        }
        public async Task Query()
        {
            token = await MainWindow.checkToken();
            if (token.UserType == "employee")
            {
                current = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");
                List<Adoption> allAdoptions = await ApiService.GetAll<Adoption>($"adoptions/{current.Id}", true);
                adoptions = new ObservableCollection<Adoption>(allAdoptions.Where(x=>x.Pending));
                Adoptions.ItemsSource = adoptions ?? Enumerable.Empty<Adoption>();
            }
        }
        private void Search_Click(object sender, RoutedEventArgs e)
        {
            var currentItems = Adoptions.ItemsSource as IEnumerable<Adoption>;
            Adoptions.ItemsSource = currentItems?.Where(x => x.AnimalName.ToLower().Contains(SearchBar.Text.ToLower())) ?? Enumerable.Empty<Adoption>();
        }
        private async void Decline_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Adoption adoption = button.DataContext as Adoption;

            if (await App.MainAppWindow.ShowConfirmationPopup("Örökbefogadás elutasítása", "Biztosan szeretné elutasítani ezt az örökbefogadási kérelmet?"))
            {
                JsonElement response = await ApiService.DeleteAsync($"adoptions/{adoption.AnimalId}/{adoption.UserId}");
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        adoptions.Remove(adoption);
                        Adoptions.ItemsSource = adoptions;
                        App.MainAppWindow.ShowSuccess("Örökbefogadás elutasítva");
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: elutasítás sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        private async void Accept_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Adoption adoption = button.DataContext as Adoption;

            if (await App.MainAppWindow.ShowConfirmationPopup("Örökbefogadás elfogadása", "Biztosan szeretné elfogadni ezt az örökbefogadási kérelmet?"))
            {
                JsonElement response = await ApiService.PutAsync($"adoptions/{adoption.AnimalId}/{adoption.UserId}",null);
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        adoptions.Remove(adoption);
                        Adoptions.ItemsSource = adoptions;
                        App.MainAppWindow.ShowSuccess("Örökbefogadás sikeres");
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: örökbefogadás sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        private async void Reset_Click(object sender, RoutedEventArgs e)
        {
            SearchBar.Text = "";
            await Query();
        }
        
    }
}
