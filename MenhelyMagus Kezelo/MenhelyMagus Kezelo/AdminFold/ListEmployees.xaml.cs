using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using MenhelyMagus_Kezelo.Classes;

namespace MenhelyMagus_Kezelo.AdminFold
{
    public partial class ListEmployees : UserControl
    {
        ObservableCollection<Employee> employees;
        int shelterIdPublic;
        public ListEmployees(int shelterId = -2)
        {
            InitializeComponent();

            shelterIdPublic = shelterId;

            _= Query(shelterId);
        }
        public async Task Query(int sherlterId)
        {
            employees = new ObservableCollection<Employee>(await ApiService.GetAll<Employee>($"employees/{App.Current.Properties["tokenSTR"]}"));
            foreach (Employee employee in employees)
            {
                await employee.InitializeShelterById(employee.ShelterId);
            }
            Employees.ItemsSource = employees;
            WasRedirected(sherlterId);
        }
        public void WasRedirected(int shelterId)
        {
            if (shelterId != -2)
            {
                Employees.ItemsSource = employees.Where(x => x.ShelterId == shelterId);
            }
        }
        public async void Delete_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Employee employee = button.DataContext as Employee;
            if (await App.MainAppWindow.ShowConfirmationPopup("Állat törlése", "Biztosan törölni szeretné az adott alkalmazottat?"))
            {
                JsonElement response = await ApiService.DeleteAsync($"employees/{employee.Id}");
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        App.MainAppWindow.ShowSuccess("Alkalmazott törölve.");
                        await Query(shelterIdPublic);
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: törlés sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        public void Link_Click(object sender, RoutedEventArgs e)
        {
            Button button = sender as Button;
            Employee employee = button.DataContext as Employee;
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new LinkEmployee(employee);
        }

        private void UnlinkedOnly_Click(object sender, RoutedEventArgs e)
        {
            SearchBar.Text = "";
            Employees.ItemsSource = employees?.Where(x => x.Shelter == default(Shelter)) ?? Enumerable.Empty<Employee>();
        }
        private void Search_Click(object sender, RoutedEventArgs e)
        {
            var currentItems = Employees.ItemsSource as IEnumerable<Employee>;
            Employees.ItemsSource = currentItems?.Where(x => x.Name.ToLower().Contains(SearchBar.Text.ToLower())) ?? Enumerable.Empty<Employee>();
        }
        private void Reset_Click(object sender, RoutedEventArgs e)
        {
            SearchBar.Text = "";
            Employees.ItemsSource = employees ?? Enumerable.Empty<Employee>();
        }
    }
}
