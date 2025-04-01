using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using MenhelyMagus_Kezelo.Classes;
using MenhelyMagus_Kezelo.Controls;

namespace MenhelyMagus_Kezelo.AdminFold
{
    public partial class ListShelters : UserControl
    {
        ObservableCollection<Shelter> shelters;
        public ListShelters()
        {
            InitializeComponent();
            
            _= Query();
        }
        public async Task Query()
        {
            shelters = new ObservableCollection<Shelter>(await ApiService.GetAll<Shelter>("shelters"));
            Shelters.ItemsSource = shelters;
            FillCities();
        }
        public void FillCities()
        {
            ObservableCollection<string> cities = new ObservableCollection<string>(shelters.Select(x => x.City).Distinct().ToList());
            Cities.Items = new ObservableCollection<object>(cities.Cast<object>());
        }
        public async void Delete_Click(object sender, RoutedEventArgs e)
        {
            
            Button button = sender as Button;
            Shelter shelter = button.DataContext as Shelter;

            if (await App.MainAppWindow.ShowConfirmationPopup("Menhely törlése", "Biztosan törölni szeretné az adott menhelyet?"))
            {
                JsonElement response= await ApiService.DeleteAsync($"shelters/{shelter.Id}");
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        shelters.Remove(shelter);

                        await Query();

                        App.MainAppWindow.ShowSuccess("Menhely törölve.");
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: törlés sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        public void Edit_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Shelter shelter = button.DataContext as Shelter;
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new EditShelter(shelter);
        }
        private void Employees_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Shelter shelter = button.DataContext as Shelter;
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new ListEmployees(shelter.Id);   
        }
        public void Cities_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if ((sender as MultiSelectComboBox).ItemsListBox.SelectedItems.Count > 0)
            {
                Shelters.ItemsSource = shelters?.Where(x => Cities.ItemsListBox.SelectedItems.Contains(x.City)) ?? Enumerable.Empty<Shelter>();
            }
            else
            {
                Shelters.ItemsSource = shelters;
            }
            Search(this, new RoutedEventArgs());
        }
        private void Search(object sender, RoutedEventArgs e)
        {
            var currentItems = Shelters.ItemsSource as IEnumerable<Shelter>;
            Shelters.ItemsSource = currentItems?.Where(x => x.Name.ToLower().Contains(SearchBar.Text.ToLower())) ?? Enumerable.Empty<Shelter>();
        }
        private void Reset_Click(object sender, RoutedEventArgs e)
        {
            SearchBar.Text = "";
            Cities.ItemsListBox.UnselectAll();
            Shelters.ItemsSource = shelters ?? Enumerable.Empty<Shelter>();
        }
    }
    
}
