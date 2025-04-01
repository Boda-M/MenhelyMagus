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

namespace MenhelyMagus_Kezelo.EmployeeFold
{
    public partial class EditAnimal : UserControl
    {
        Token token;
        Employee current;
        Animal old;
        public EditAnimal(Animal old)
        {
            this.old = old;
            InitializeComponent();

            _ = GetOptions();
            
        }
        private async Task GetOptions()
        {
            old = await ApiService.GetOne<Animal>($"animals/{old.Id}");
            await old.Initialize();
            Species.ItemsSource = await ApiService.GetAll<Species>("species");
            token = await MainWindow.checkToken();
            current = await ApiService.GetOne<Employee>($"employees/{token.UserId}/{token.TokenSTR}");
            UploadOld();

        }
        private async void UploadOld()
        {
            Name.Text = old.Name;
            BirthDate.SelectedDate = old.BirthDate;
            EntryDate.SelectedDate = old.EntryDate;

            Species.SelectedValuePath = "Id";
            Species.SelectedValue = old.Species.Id;

            Breeds.Items = new ObservableCollection<object>(await ApiService.GetAll<Breed>($"breeds/species/{old.Species.Id}"));
            Breeds.SetDefaultSelectedItems<Breed>(old.Breeds);

            Breeds.Items = new ObservableCollection<object>(await ApiService.GetAll<Breed>($"breeds/species/{old.Species.Id}"));
            Breeds.SetDefaultSelectedItems<Breed>(old.Breeds);

            Vaccines.Items = new ObservableCollection<object>(await ApiService.GetAll<Vaccine>($"vaccines/species/{old.Species.Id}"));
            Vaccines.SetDefaultSelectedItems<Vaccine>(old.Vaccines);

            Habitats.Items = new ObservableCollection<object>(await ApiService.GetAll<Habitat>($"habitats"));
            Habitats.SetDefaultSelectedItems<Habitat>(old.Habitats);

            Image.Source = old.Image;

            Weight.Text = old.Weight.ToString(System.Globalization.CultureInfo.InvariantCulture);
            switch (old.Gender)
            {
                case "M":
                    Gender.SelectedValue = "Hím";break;
                case "F":
                    Gender.SelectedValue = "Nőstény";break;
                case "U":
                    Gender.SelectedValue = "Ismeretlen";break;
            }
            CB_Healthy.IsChecked = old.Healthy;
            CB_Neutered.IsChecked = old.Neutered;
            CB_Housebroken.IsChecked = old.Housebroken;
            Description.Text = old.Description;

            Cuteness.Value = old.Cuteness;
            ChildFriendlyness.Value = old.ChildFriendlyness;
            Sociability.Value = old.Sociability;
            ExerciseNeed.Value = old.ExerciseNeed;
            FurLength.Value=old.FurLength;
            Docility.Value=old.Docility;
        }

        public async void Edit_click(object sender, RoutedEventArgs e)
        {
            if (IsFilled() && IsValid())
            {
                if (await App.MainAppWindow.ShowConfirmationPopup("Állat módosítása", "Biztosan módosítani szeretné ezt az állatot?"))
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

                    JsonElement response = await ApiService.PutAsync($"animals/{old.Id}", jsonString_);
                    if (response.TryGetProperty("code", out JsonElement code) && response.TryGetProperty("message", out JsonElement message))
                    {
                        if (int.Parse(code.ToString()) == 200)
                        {
                            App.MainAppWindow.ShowSuccess("Állat sikeresen módosítva.");
                            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
                            mainWindow.MainContent.Content = new ListAnimals();
                        }
                        else
                        {
                            App.MainAppWindow.ShowError($"Hiba: Módosítás sikertelen.\n{code.ToString()}: {message.ToString()}");
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
            if (Image.Source.ToString() == "pack://application:,,,/IMG/imageicon.png" || string.IsNullOrEmpty(Image.Source.ToString()))
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
        private bool IsValid()
        {
            bool valid = false;
            if (BirthDate.SelectedDate.Value.Date > DateTime.Today)
            {
                App.MainAppWindow.ShowError("Születési dátumnak nem adhat meg jövőbeli dátumot");
            }
            else if (!double.TryParse(Weight.Text, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out double suly) || suly <= 0)
            {
                App.MainAppWindow.ShowError("Adjon meg egy pozítív számot súlynak!");
            }
            else { valid = true; }
            return valid;
        }
        private void Cancel(object sender, RoutedEventArgs e)
        {
            MainWindow mainWindow = Window.GetWindow(this) as MainWindow;
            mainWindow.MainContent.Content = new ListAnimals();
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
        public void OnlyNumeric(object sender, TextCompositionEventArgs e) {
            Regex regex = new Regex(@"^[0-9]*(\.[0-9]*)?$");
            e.Handled = !regex.IsMatch(e.Text);
        }
        private async void Species_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            Species species = (Species)Species.SelectedItem;
            species.Breeds = await ApiService.GetAll<Breed>("breeds/species/" + species.Id);
            species.Vaccines = await ApiService.GetAll<Vaccine>("vaccines/species/" + species.Id);

            Breeds.Items = new ObservableCollection<object>(species.Breeds);
            Vaccines.Items = new ObservableCollection<object>(species.Vaccines);
        }
    }
}
