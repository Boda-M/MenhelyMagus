using System;
using System.IO;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.Windows.Media.Imaging;

namespace MenhelyMagus_Kezelo.Classes
{
    internal class Adoption
    {
        [JsonPropertyName("pending")]
        public string Pending_str
        {
            get => _pending;
            set
            {
                _pending = value;
                Pending = value == "1";
            }
        }
        private string _pending;
        public bool Pending { get; set; }

        [JsonPropertyName("animalId")]
        public string AnimalId_str
        {
            get => _animalId;
            set
            {
                _animalId = value;
                AnimalId = int.TryParse(value, out var parsedId) ? parsedId : -1;
            }
        }
        private string _animalId;
        public int AnimalId { get; set; }
        public Animal Animal { get; set; }

        [JsonPropertyName("animalGender")]
        public string AnimalGender { get; set; }

        [JsonPropertyName("animalBirthDate")]
        public string AnimalBirthDate_str
        {
            get => _animalBirthDate;
            set
            {
                _animalBirthDate = value;
                AnimalBirthDate = DateTime.TryParse(value, out var parsedDate) ? parsedDate : DateTime.MinValue;
                AnimalAge = (DateTime.Today.Year - AnimalBirthDate.Year);
                if (AnimalBirthDate.Date > DateTime.Today.AddYears(-AnimalAge)) AnimalAge--;
            }
        }
        private string _animalBirthDate;
        public DateTime AnimalBirthDate { get; set; }
        public int AnimalAge { get; set; }

        [JsonPropertyName("animalName")]
        public string AnimalName { get; set; }

        [JsonPropertyName("userId")]
        public string UserId_str
        {
            get => _userId;
            set
            {
                _userId = value;
                UserId = int.TryParse(value, out var parsedId) ? parsedId : -1;
            }
        }
        private string _userId;
        public int UserId { get; set; }

        [JsonPropertyName("userName")]
        public string UserName { get; set; }

        [JsonPropertyName("userEmail")]
        public string UserEmail { get; set; }

        [JsonPropertyName("userCity")]
        public string UserCity { get; set; }

        [JsonPropertyName("userStreet")]
        public string UserStreet { get; set; }

        [JsonPropertyName("userHouseNumber")]
        public string UserHouseNumber { get; set; }

        [JsonPropertyName("userTelephoneNumber")]
        public string UserTelephoneNumber { get; set; }

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
                    Image = new BitmapImage(new Uri("pack://application:,,,/IMG/imageicon.png"));
                }

            }
        }
        public BitmapImage Image { get; set; }


        public async Task Initialize()
        {
            await InitializeAnimal();
        }

        public async Task InitializeAnimal()
        {
            if (AnimalId != -1)
            {
                Animal = await ApiService.GetOne<Animal>($"animals/{AnimalId}");
            }
        }
    }
}
