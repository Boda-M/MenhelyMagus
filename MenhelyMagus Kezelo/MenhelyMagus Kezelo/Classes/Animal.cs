using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Windows.Media.Imaging;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Animal 
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        private string _shelter_id_str;
        [JsonPropertyName("shelterId")]
        public string ShelterId_str
        {
            get => _shelter_id_str;
            set
            {
                _shelter_id_str = value;
                ShelterId = int.TryParse(value, out var parsedId) ? parsedId : -1; // Set to -1 if parsing fails
            }
        }

        public int ShelterId { get; set; }
        public Shelter Shelter { get; set; }
        public string ShelterAsString => $"\n{Shelter.ShortInfo()}";

        private string _birthDate;
        [JsonPropertyName("birthDate")]
        public string BirthDate_str
        {
            get => _birthDate;
            set
            {
                _birthDate = value;
                BirthDate = DateTime.TryParse(value, out var parsedDate) ? parsedDate : DateTime.MinValue; // Default to MinValue if parsing fails
                Age = (DateTime.Today.Year - BirthDate.Year);
                if (BirthDate.Date > DateTime.Today.AddYears(-Age)) Age--;
            }
        }
        public int Age { get; set; }
        public DateTime BirthDate { get; set; }

        private string _entryDate;
        [JsonPropertyName("entryDate")]
        public string EntryDate_str
        {
            get => _entryDate;
            set
            {
                _entryDate = value;
                EntryDate = DateTime.TryParse(value, out var parsedDate) ? parsedDate : DateTime.MinValue;
            }
        }
        public DateTime EntryDate { get; set; }

        [JsonPropertyName("speciesId")]
        public string SpeciesId_str { get; set; }
        [JsonPropertyName("species")]
        public string SpeciesString { get; set; } //we dont need to make it an object while only calling from aninalspaginator
        public Species Species {  get; set; }
        
        [JsonPropertyName("breed")]
        public List<string> Breed_str { get; set; }
        public List<Breed> Breeds { get; set; } = new List<Breed>();
        public string BreedsAsString => string.Join(", ", Breeds);

        [JsonPropertyName("breedNames")]
        public List<string> BreedNames { get; set; }
        public string BreedNamesAsString => string.Join(", ", BreedNames);


        [JsonPropertyName("vaccine")]
        public List<string> Vaccine_str { get; set; }
        public List<Vaccine> Vaccines { get; set; } = new List<Vaccine>();
        public string VaccinesAsString => string.Join(", ", Vaccines);

        [JsonPropertyName("habitat")]
        public List<string> Habitat_str { get; set; }
        public List<Habitat> Habitats { get; set; } = new List<Habitat>();
        public string HabitatsAsString => string.Join(", ", Habitats);

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("gender")]
        public string Gender { get; set; }

        private string _neutered;
        [JsonPropertyName("neutered")]
        public string Neutered_str
        {
            get => _neutered;
            set
            {
                _neutered = value;
                Neutered = value == "1";
            }
        }
        public bool Neutered { get; set; }

        private string _healthy;
        [JsonPropertyName("healthy")]
        public string Healthy_str
        {
            get => _healthy;
            set
            {
                _healthy = value;
                Healthy = value == "1";
            }
        }
        public bool Healthy { get; set; }

        private string _housebroken;
        [JsonPropertyName("housebroken")]
        public string Housebroken_str
        {
            get => _housebroken;
            set
            {
                _housebroken = value;
                Housebroken = value == "1";
            }
        }
        public bool Housebroken { get; set; }

        [JsonPropertyName("description")]
        public string Description { get; set; }

        private string _weight;
        [JsonPropertyName("weight")]
        public string Weight_str
        {
            get => _weight;
            set
            {
                _weight = value;
                Weight = double.TryParse(value, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture,out double parsedValue) ? parsedValue : 0;
            }
        }
        public double Weight { get; set; }

        private string _cuteness;
        [JsonPropertyName("cuteness")]
        public string Cuteness_str
        {
            get => _cuteness;
            set
            {
                _cuteness = value;
                Cuteness = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int Cuteness { get; set; }

        private string _childFriendlyness;
        [JsonPropertyName("childFriendlyness")]
        public string ChildFriendlyness_str
        {
            get => _childFriendlyness;
            set
            {
                _childFriendlyness = value;
                ChildFriendlyness = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int ChildFriendlyness { get; set; }

        private string _sociability;
        [JsonPropertyName("sociability")]
        public string Sociability_str
        {
            get => _sociability;
            set
            {
                _sociability = value;
                Sociability = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int Sociability { get; set; }

        private string _exerciseNeed;
        [JsonPropertyName("exerciseNeed")]
        public string ExerciseNeed_str
        {
            get => _exerciseNeed;
            set
            {
                _exerciseNeed = value;
                ExerciseNeed = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int ExerciseNeed { get; set; }

        private string _furLength;
        [JsonPropertyName("furLength")]
        public string FurLength_str
        {
            get => _furLength;
            set
            {
                _furLength = value;
                FurLength = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int FurLength { get; set; }

        private string _docility;
        [JsonPropertyName("docility")]
        public string Docility_str
        {
            get => _docility;
            set
            {
                _docility = value;
                Docility = int.TryParse(value, out var parsedValue) ? parsedValue : 0;
            }
        }
        public int Docility { get; set; }

        private string _imgbase64;
        [JsonPropertyName("img")]
        public string Imagebase64_str
        {
            get => _imgbase64;
            set
            {
                _imgbase64 = value;
                try
                {
                    if (value.StartsWith("data:image"))
                    {
                        value = value.Substring(value.IndexOf(",") + 1);
                    }
                    byte[] imageBytes = Convert.FromBase64String(value);
                    using (MemoryStream ms = new MemoryStream(imageBytes))
                    {
                        BitmapImage bitmap = new BitmapImage();
                        bitmap.BeginInit();
                        bitmap.CacheOption = BitmapCacheOption.OnLoad;
                        bitmap.StreamSource = ms;
                        bitmap.EndInit();
                        Image = bitmap;
                    }
                }
                catch
                {
                    Image= new BitmapImage(new Uri("pack://application:,,,/IMG/imageicon.png"));
                }
                
            }
        }
        public BitmapImage Image { get; set; }
        public async Task Initialize() 
        {
            await InitializeSpecies();
            await InitializeBreed();
            await InitializeShelter();
            await InitializeVaccine();
            await InitializeHabitat();
        }

        public async Task InitializeSpecies()
        {
            if (SpeciesId_str != "-1")
            {
                Species = await ApiService.GetOne<Species>($"species/{SpeciesId_str}");
            }
        }
        public async Task InitializeBreed()
        {
            Breeds.Clear();
            foreach(string breedId in Breed_str)
            {
                Breeds.Add(await ApiService.GetOne<Breed>($"breeds/{breedId}"));
            }
        }
        public async Task InitializeVaccine()
        {
            Vaccines.Clear();
            foreach (string vaccineId in Vaccine_str)
            {
                Vaccines.Add(await ApiService.GetOne<Vaccine>($"vaccines/{vaccineId}"));
            }
        }
        public async Task InitializeHabitat()
        {
            Habitats.Clear();
            foreach (string habitatId in Habitat_str)
            {
                Habitats.Add(await ApiService.GetOne<Habitat>($"habitats/{habitatId}"));
            }
        }
        public async Task InitializeShelter()
        {
            if (ShelterId!=-1)
            {
                Shelter=await ApiService.GetOne<Shelter>($"shelters/{ShelterId}");
            }
        }
    }
}
