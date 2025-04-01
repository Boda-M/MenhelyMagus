using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    internal class Admin
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


        // Parameterless constructor for deserialization
        public Admin()
        {
        }
    }
}
