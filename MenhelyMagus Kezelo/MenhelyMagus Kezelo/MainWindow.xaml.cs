using System;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
using MenhelyMagus_Kezelo.AdminFold;
using MenhelyMagus_Kezelo.Classes;
using MenhelyMagus_Kezelo.EmployeeFold;
using MenhelyMagus_Kezelo.AccountFold;

namespace MenhelyMagus_Kezelo
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    /// 

    public partial class MainWindow : Window
    {
        private DispatcherTimer popupTimer;
        public static async Task<Token> checkToken()
        {
            Token token = await ApiService.GetOne<Token>($"tokens/{App.Current.Properties["tokenSTR"].ToString()}");
            return token;
        }
        public static async Task<string> getUserType()
        {
            Token foundToken =await checkToken();
            return foundToken?.UserType??"NLI";  //NotLoggedIn
        }
        
        public MainWindow()
        {
            InitializeComponent();
            App.Current.Properties["tokenSTR"] = "nothing";
            MainContent.Content = new Login();
            popupTimer = new DispatcherTimer();
        }

        private Popup FindPopup()
        {
            return MainContent.FindName("FeedbackPopup") as Popup;
        }

        private void Login_Redirect_Click(object sender ,RoutedEventArgs e)
        {
            MainContent.Content = new Login();
        }
        private void Logout(object sender, RoutedEventArgs e) {
            
            App.Current.Properties["tokenSTR"]="nothing";
            ((MenuItem)Application.Current.MainWindow.FindName("admin_menu")).IsEnabled = false;
            ((MenuItem)Application.Current.MainWindow.FindName("employee_menu")).IsEnabled = false;

            ((MenuItem)Application.Current.MainWindow.FindName("logout_menu")).IsEnabled = false;
            ((MenuItem)Application.Current.MainWindow.FindName("login_menu")).IsEnabled = true;
            ((MenuItem)Application.Current.MainWindow.FindName("register_menu")).IsEnabled = true;
            ((MenuItem)Application.Current.MainWindow.FindName("change_credentials_menu")).IsEnabled = false;
            ((MenuItem)Application.Current.MainWindow.FindName("deleteaccount")).IsEnabled = false;
            App.MainAppWindow.ShowSuccess("Sikeres Kijelentkezés");
            MainContent.Content = new Login();

            adminArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
            adminIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/adminIconGray.ico"));

            employeeArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
            employeeIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/employeeIconGray.ico"));
        }
        public async void Delete_Account_Click(Object sender, RoutedEventArgs e)
        {
            if (await App.MainAppWindow.ShowConfirmationPopup("Fiók törlése", "Biztosan törölni szeretné fiókját?"))
            {
                Token current = (await checkToken());
                JsonElement response = await ApiService.DeleteAsync($"{current.UserType}s/{current.UserId}");
                if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                {
                    if (int.Parse(code.ToString()) == 200)
                    {
                        App.MainAppWindow.ShowSuccess("Fiók törlése sikeres volt!");

                        App.Current.Properties["tokenSTR"] = "nothing";
                        ((MenuItem)Application.Current.MainWindow.FindName("admin_menu")).IsEnabled = false;
                        ((MenuItem)Application.Current.MainWindow.FindName("employee_menu")).IsEnabled = false;

                        ((MenuItem)Application.Current.MainWindow.FindName("logout_menu")).IsEnabled = false;
                        ((MenuItem)Application.Current.MainWindow.FindName("login_menu")).IsEnabled = true;
                        ((MenuItem)Application.Current.MainWindow.FindName("register_menu")).IsEnabled = true;
                        ((MenuItem)Application.Current.MainWindow.FindName("change_credentials_menu")).IsEnabled = false;
                        ((MenuItem)Application.Current.MainWindow.FindName("deleteaccount")).IsEnabled = false;

                        adminArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
                        adminIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/adminIconGray.ico"));

                        employeeArrow.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/rightArrowGray.ico"));
                        employeeIcon.Source = new BitmapImage(new Uri("pack://application:,,,/IMG/employeeIconGray.ico"));

                        MainContent.Content = new Login();
                    }
                    else
                    {
                        App.MainAppWindow.ShowError($"Hiba: törlés sikertelen.\n{code.ToString()}: {message.ToString()}");
                    }
                }
                else { App.MainAppWindow.ServerError(); }
            }
        }
        public void Register_Redirect_Click(Object sender ,RoutedEventArgs e)
        {
            MainContent.Content = new Register();
        }
        public void ChangeCredentials_Redirect_Click(Object sender ,RoutedEventArgs e)
        {
            MainContent.Content = new ChangeCredentials();
        }
        public void AddAdmin_RedirectClick(Object sender ,RoutedEventArgs e)
        {
            MainContent.Content = new AddAdmin();
        }
        public void ListEmployee_Redirect_Click(object sender, RoutedEventArgs e)
        {
            MainContent.Content = new ListEmployees();
        }
        public void AddShelter_Redirect_Click(object sender, RoutedEventArgs e) {
            MainContent.Content = new AddShelter();
        }
        public void ListShelter_Redirect_Click(object sender, RoutedEventArgs e)
        {
            MainContent.Content = new ListShelters();
        }        
        public void EmployeeMenu_Redirect_Click(object sender, RoutedEventArgs e)
        {
            IsLinkedToShelter();
        }
        public async void IsLinkedToShelter()
        {
            Token token = await MainWindow.checkToken();
            Employee current = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");
            if (current.ShelterId == -1)
            {
                Label label = new Label();
                label.Content = "Még nincsen menhelye!\nKérjük várja meg amíg egy adminisztrátorunk beállít egyet!!";
                label.Foreground = Brushes.White;
                label.HorizontalAlignment = HorizontalAlignment.Center;
                label.VerticalAlignment = VerticalAlignment.Center;
                label.FontSize = 20;
                label.FontWeight = FontWeights.Bold;
                MainContent.Content = label;
                ((MenuItem)Application.Current.MainWindow.FindName("add_animal_menu")).IsEnabled = false;
                ((MenuItem)Application.Current.MainWindow.FindName("list_animals_menu")).IsEnabled = false;
                ((MenuItem)Application.Current.MainWindow.FindName("list_adoptions_menu")).IsEnabled = false;
            }
            else
            {
                ((MenuItem)Application.Current.MainWindow.FindName("add_animal_menu")).IsEnabled = true;
                ((MenuItem)Application.Current.MainWindow.FindName("list_animals_menu")).IsEnabled = true;
                ((MenuItem)Application.Current.MainWindow.FindName("list_adoptions_menu")).IsEnabled = true;
            }
        }

        public void AddAnimal_Redirect_click(object sender, RoutedEventArgs e) {
            MainContent.Content = new AddAnimal();
        }
        public void ListAnimals_Redirect_Click(object sender, RoutedEventArgs e) {
            MainContent.Content = new ListAnimals();
        }
        public void ListAdoptions_Redirect_Click(object sender, RoutedEventArgs e) {
            MainContent.Content = new AdoptAnimals();
        }

        private void ExitApplication(object sender, RoutedEventArgs e)
        {
            Application.Current.Shutdown();
        }

        private void MinimizeApplication(object sender, RoutedEventArgs e)
        {
            WindowState = WindowState.Minimized;
        }

        private void Drag(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Left)
                this.DragMove();
        }

        private void Window_PreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (FocusManager.GetFocusedElement(this) is TextBox && !(e.OriginalSource is TextBox))
            {
                // Clear focus by setting it to the Window
                FocusManager.SetFocusedElement(this, this);
                Keyboard.ClearFocus();
            }
        }
        private void ShowPopup(string message, Brush backgroundColor)
        {
            Popup feedbackPopup = FindPopup();
            feedbackPopup.IsOpen = false;
            
            Border feedbackBorder = feedbackPopup.Child as Border;
            TextBlock feedbackText = feedbackBorder.Child as TextBlock;

            feedbackText.Text = message;
            feedbackBorder.Background = backgroundColor; 

            // Get MainContent size
            double contentWidth = MainContent.ActualWidth;
            double contentHeight = MainContent.ActualHeight;

            // Open the popup to allow actual size calculation (it will remain invisible initially)
            feedbackPopup.IsOpen = true;

            // Center the Popup (if needed)
            feedbackPopup.HorizontalOffset = (contentWidth - feedbackBorder.ActualWidth) / 2;
            feedbackPopup.VerticalOffset = contentHeight - feedbackBorder.ActualHeight;


            // Handle the closing after 3 seconds with the timer
            popupTimer.Stop();
            popupTimer.Interval = TimeSpan.FromSeconds(3);
            popupTimer.Start();
            popupTimer.Tick -= PopupTimer_Tick;
            popupTimer.Tick += PopupTimer_Tick;
        }
        private void PopupTimer_Tick(object sender, EventArgs e)
        {
            Popup feedbackPopup = FindPopup();
            feedbackPopup.IsOpen = false;
            popupTimer.Stop();
            popupTimer.Tick -= PopupTimer_Tick; // Unsubscribe after execution
        }
        public void ShowSuccess(string message,Brush brush=null)
        {
            if (brush == null)
            {
                brush = (LinearGradientBrush)Application.Current.Resources["GradientGreenBrush"];
            }
            ShowPopup($"✅ {message}", brush);
        }

        public void ShowError(string message, Brush brush = null)
        {
            if (brush == null)
            {
                brush= (LinearGradientBrush)Application.Current.Resources["GradientRedBrush"];
            }
            ShowPopup($"❌ {message}", brush);
        }
        public void ServerError()
        {
            ShowError("Hiba: A szerver nem elérhető");
        }

        private TaskCompletionSource<bool> _taskCompletionSource;

        public async Task<bool> ShowConfirmationPopup(string title, string description)
        {
            PopupTitle.Text = title;
            PopupDescription.Text = description;

            ConfirmationPopup.IsOpen = true;

            // Create a TaskCompletionSource to handle the result of the popup
            _taskCompletionSource = new TaskCompletionSource<bool>();

            // Return the Task to the caller, so it can await the result
            return await _taskCompletionSource.Task;
        }

        private void YesButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the popup and return true to the caller
            ConfirmationPopup.IsOpen = false;
            _taskCompletionSource.SetResult(true);
        }

        private void NoButton_Click(object sender, RoutedEventArgs e)
        {
            // Close the popup and return false to the caller
            ConfirmationPopup.IsOpen = false;
            _taskCompletionSource.SetResult(false);
        }
    }
}
