using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Employee
    {
        private string _id_str;

        [JsonPropertyName("id")]
        public string Id_str
        {
            get => _id_str;
            set
            {
                _id_str = value;
                Id = int.TryParse(value, out var parsedId) ? parsedId : -1; // Set to -1 if parsing fails
            }
        }
        public int Id { get; set; }

        [JsonPropertyName("email")]
        public string Email { get; set; }

        [JsonPropertyName("passwordHash")]
        public string Password { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

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
        private int _shelterId;
        public int ShelterId
        {
            get => _shelterId;
            set
            {
                _shelterId = value;
            }
        }


        [JsonIgnore]
        public Shelter Shelter {  get; set; }

        public string ShelterShortInfo => Shelter?.ShortInfo()??"Nincsen menhelye";

        // Parameterless constructor for deserialization
        public Employee()
        {
        }
        public async Task InitializeShelterById(int shelterId)
        {
            if (shelterId != -1)
            {
                Shelter = await ApiService.GetOne<Shelter>($"shelters/{shelterId}");
            }
        }
    }
}
