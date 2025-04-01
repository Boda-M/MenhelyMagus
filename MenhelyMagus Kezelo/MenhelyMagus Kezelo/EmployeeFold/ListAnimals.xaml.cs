using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using MenhelyMagus_Kezelo.Classes;
using MenhelyMagus_Kezelo.Controls;

namespace MenhelyMagus_Kezelo.EmployeeFold
{
    public partial class ListAnimals : UserControl
    {
        ObservableCollection<Animal> animals;
        Token token;
        Employee current;
        public ListAnimals()
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
                var body = new Dictionary<string, object>
                {
                    {
                        "filters", new Dictionary<string, object>
                        {
                            { "shelters", new List<string> { current.ShelterId.ToString() } }
                        }
                    }
                };
                animals = new ObservableCollection<Animal>(await GetAnimalsViaPaginator());
                Animals.ItemsSource = animals;

                Species_Filter.Items = new ObservableCollection<object>(await ApiService.GetAll<Species>("species"));
            }
        }
        private async Task<List<Animal>> GetAnimalsViaPaginator()//we cant use getall, since the payload would be too large to handle
        {
            var body = new Dictionary<string, object>
                {
                    {
                        "filters", new Dictionary<string, object>
                        {
                            { "shelters", new List<string> { current.ShelterId.ToString() } }
                        }
                    }
                };
            JsonElement json = await ApiService.PostAsync("animalsPaginator/50/1", JsonSerializer.Serialize(body));
            var data = json.GetProperty("data");
            List<Animal> list = JsonSerializer.Deserialize<List<Animal>>(data);
            while (int.Parse(json.GetProperty("meta").GetProperty("currentPage").ToString()) < json.GetProperty("meta").GetProperty("pageCount").GetInt32())
            {
                json = await ApiService.PostAsync($"animalsPaginator/50/{int.Parse(json.GetProperty("meta").GetProperty("currentPage").ToString())+1}", JsonSerializer.Serialize(body));
                data = json.GetProperty("data");
                list.AddRange(JsonSerializer.Deserialize<List<Animal>>(data));
            }
            return list;
        }
        public async void Delete_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Animal animal = button.DataContext as Animal;

            if (await App.MainAppWindow.ShowConfirmationPopup("Állat törlése", "Biztosan törölni szeretné az adott állatot?"))
            {
                var body = new Dictionary<string, object>
                {
                    {"shelterId",current.ShelterId} //an employee can only delete from their own shelter
                };
                string jsonString = JsonSerializer.Serialize(body);
                JsonElement response = await ApiService.DeleteAsync($"animals/{animal.Id}",jsonString);
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        animals.Remove(animal);
                        Animals.ItemsSource = animals;
                        App.MainAppWindow.ShowSuccess("Sikeres törlés");
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: törlés sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        private void Search_Click(object sender, RoutedEventArgs e)
        {
            var currentItems = Animals.ItemsSource as IEnumerable<Animal>;
            Animals.ItemsSource = currentItems?.Where(x => x.Name.ToLower().Contains(SearchBar.Text.ToLower())) ?? Enumerable.Empty<Animal>();
        }
        private void Reset_Click(object sender, RoutedEventArgs e)
        {
            SearchBar.Text = "";
            Animals.ItemsSource = animals ?? Enumerable.Empty<Animal>();
            Species_Filter.ItemsListBox.SelectedItems.Clear();
        }
        private void Edit_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Animal animal = button.DataContext as Animal;
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new EditAnimal(animal);
        }
        public void Species_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if ((sender as MultiSelectComboBox).ItemsListBox.SelectedItems.Count > 0)
            {
                Animals.ItemsSource = animals?.Where(x => Species_Filter.ItemsListBox.SelectedItems.Cast<Species>()
                .Select(y => y.Name)
                .Contains(x.SpeciesString)) ?? Enumerable.Empty<Animal>();
            }
            else
            {
                Animals.ItemsSource = animals;
            }
            Search_Click(this, new RoutedEventArgs());
        }
    }
}
