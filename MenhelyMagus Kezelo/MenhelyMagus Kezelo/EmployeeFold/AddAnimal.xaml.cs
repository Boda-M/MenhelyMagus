using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media.Imaging;
using MenhelyMagus_Kezelo.Classes;
using Microsoft.Win32;
using static System.Net.Mime.MediaTypeNames;

namespace MenhelyMagus_Kezelo.EmployeeFold
{
    public partial class AddAnimal : UserControl
    {
        Token token;
        Employee current;
        public AddAnimal() {
            InitializeComponent();

            _ = GetOptions();
        }

        private async Task GetOptions()
        {
            token = await MainWindow.checkToken();
            current = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");

            Species.ItemsSource = await ApiService.GetAll<Species>("species");
            Habitats.Items = new ObservableCollection<object>(await ApiService.GetAll<Habitat>("habitats"));
            EntryDate.SelectedDate = DateTime.Now;
            
        }
        public void ChangeImage_Click(object sender, RoutedEventArgs e)
        {
            OpenFileDialog openFileDialog = new OpenFileDialog
            {
                Filter = "Image files (*.png;*.jpeg;*.jpg)|*.png;*.jpeg;*.jpg|All files (*.*)|*.*"
            };

            if (openFileDialog.ShowDialog() == true)
            {
                try
                {
                    BitmapImage bitmap = new BitmapImage(new Uri(openFileDialog.FileName));
                    Image.Source = bitmap;
                }
                catch (Exception ex)
                {
                    App.MainAppWindow.ShowError($"A kép nem tölthető be: {ex.Message}");
                }
            }
        }
        private void OnlyNumeric(object sender, TextCompositionEventArgs e)
        {
            Regex regex = new Regex(@"^[0-9]*(\.[0-9]*)?$");
            e.Handled = !regex.IsMatch(e.Text);
        }
        public async void Add_Click(object sender, RoutedEventArgs e)
        {
            if (IsFilled()&&IsValid())
            {
                if (await App.MainAppWindow.ShowConfirmationPopup("Állat hozzáadása", "Biztosan hozzá szeretné adni ezt az állatot?"))
                {
                    string gender = "";
                    switch (Gender.SelectedValue)
                    {
                        case "Hím":
                            gender = "M";
                            break;
                        case "Nőstény":
                            gender = "F";
                            break;
                        case "Ismeretlen":
                            gender = "U";
                            break;
                    }
                    string[] breedId = new string[Breeds.ItemsListBox.SelectedItems.Count];
                    for (int i = 0; i < breedId.Length; i++)
                    {
                        breedId[i] = ((Breed)Breeds.ItemsListBox.SelectedItems[i]).Id;
                    }
                    string[] vaccineId = new string[Vaccines.ItemsListBox.SelectedItems.Count];
                    for (int i = 0; i < vaccineId.Length; i++)
                    {
                        vaccineId[i] = ((Vaccine)Vaccines.ItemsListBox.SelectedItems[i]).Id;
                    }
                    string[] habitatId = new string[Habitats.ItemsListBox.SelectedItems.Count];
                    for (int i = 0; i < habitatId.Length; i++)
                    {
                        habitatId[i] = ((Habitat)Habitats.ItemsListBox.SelectedItems[i]).Id;
                    }
                    byte[] imageBytes;
                    using (MemoryStream ms = new MemoryStream())
                    {
                        JpegBitmapEncoder encoder = new JpegBitmapEncoder();
                        encoder.Frames.Add(BitmapFrame.Create((BitmapSource)Image.Source));
                        encoder.Save(ms);
                        imageBytes = ms.ToArray();
                    }
                    string base64img = Convert.ToBase64String(imageBytes);
                    string jsonPayloadimg = $"{{\"img\":\"data:image/jpeg;base64,{base64img}\"}}";

                    var animal = new Dictionary<string, object>
                    {
                        { "shelterId",current.ShelterId },

                        {"image", jsonPayloadimg},

                        { "birthDate", BirthDate.SelectedDate.Value.Date.ToString("yyyy-MM-dd") },
                        { "entryDate", EntryDate.SelectedDate.Value.Date.ToString("yyyy-MM-dd")},
                        { "speciesId", ((Species)Species.SelectedItem).Id },
                        { "breedId", breedId},
                        { "vaccineId", vaccineId},
                        { "habitatId", habitatId},
                        { "name", Name.Text },
                        { "gender",gender },
                        { "weight", double.Parse(Weight.Text, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture) },

                        { "neutered", (CB_Neutered.IsChecked ?? false) ? 1 : 0},
                        { "healthy", (CB_Healthy.IsChecked?? false) ? 1 : 0 },
                        { "housebroken", (CB_Housebroken.IsChecked?? false) ? 1 : 0 },

                        { "description", Description.Text },

                        { "cuteness", Cuteness.Value},
                        { "childFriendlyness", ChildFriendlyness.Value},
                        { "sociability", Sociability.Value},
                        { "exerciseNeed", ExerciseNeed.Value},
                        { "furLength", FurLength.Value},
                        { "docility", Docility.Value}
                    };
                    string jsonString_ = JsonSerializer.Serialize(animal);

                    JsonElement response = await ApiService.PostAsync("animals", jsonString_);
                    if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                    {
                        if (int.Parse(code.ToString()) == 201)
                        {
                            App.MainAppWindow.ShowSuccess("Állat sikeresen létrehozva.");
                            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                            mainWindow.MainContent.Content = new AddAnimal();
                        }
                        else
                        {
                            App.MainAppWindow.ShowError($"Hiba: létrehozás sikertelen.\n{code.ToString()}: {message.ToString()}");
                        }
                    }
                    else App.MainAppWindow.ServerError();
                }
            }
        }
        public bool IsFilled()
        {
            string errorMessage = "Kérem töltse ki a következő mezőket:\n";

            if (string.IsNullOrWhiteSpace(Name.Text))
            {
                errorMessage += "- Név\n";
            }
            if (!BirthDate.SelectedDate.HasValue)
            {
                errorMessage += "- Születési dátum\n";
            }
            if (!EntryDate.SelectedDate.HasValue)
            {
                errorMessage += "- Bekerülés dátuma\n";
            }
            if (Species.SelectedItem == null)
            {
                errorMessage += "- Faj\n";
            }
            if (Breeds.ItemsListBox.SelectedItems == null || Breeds.ItemsListBox.SelectedItems.Count == 0)
            {
                errorMessage += "- Fajta\n";
            }
            if (Habitats.ItemsListBox.SelectedItems == null || Habitats.ItemsListBox.SelectedItems.Count == 0)
            {
                errorMessage += "- Élőhelyek\n";
            }
            if (string.IsNullOrWhiteSpace(Weight.Text))
            {
                errorMessage += "- Súly\n";
            }
            if (Gender.SelectedItem == null)
            {
                errorMessage += "- Nem\n";
            }
            if(Image.Source.ToString() == "pack://application:,,,/IMG/imageicon.png")
            {
                errorMessage += "- Kép \n"; 
            }

            if (errorMessage != "Kérem töltse ki a következő mezőket:\n")
            {
                App.MainAppWindow.ShowError(errorMessage.TrimEnd());
                return false;
            }
            return true;
        }
        private bool IsValid() {
            bool valid =false;
            if (BirthDate.SelectedDate.Value.Date > EntryDate.SelectedDate.Value.Date)
            {
                App.MainAppWindow.ShowError("Születési dátumnak nem adhat meg menhelybekerülés utáni dátumot!");
            }
            else if (!double.TryParse(Weight.Text, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out double suly) || suly <= 0)
            {
                App.MainAppWindow.ShowError("Adjon meg egy pozítív számot súlynak!");
            }
            else { valid = true; }
            return valid;
        }
        private async void Species_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Species species = (Species)Species.SelectedItem;
            species.Breeds= await ApiService.GetAll<Breed>("breeds/species/" + species.Id);
            species.Vaccines = await ApiService.GetAll<Vaccine>("vaccines/species/" + species.Id);

            Breeds.Items = new ObservableCollection<object>(species.Breeds);
            Vaccines.Items = new ObservableCollection<object>(species.Vaccines);
        }
    }
}
