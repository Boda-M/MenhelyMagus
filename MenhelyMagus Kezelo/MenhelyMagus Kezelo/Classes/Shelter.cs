using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Shelter
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
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("telephoneNumber")]
        public string PhoneNumber { get; set; }
        [JsonPropertyName("city")]
        public string City {  get; set; }
        [JsonPropertyName("street")]
        public string Street { get; set; }
        [JsonPropertyName("houseNumber")]
        public string HouseNumber { get; set; }

        [JsonConstructor]
        public Shelter(string id_str, string name,string email, string phoneNumber, string city,string street,string houseNumber)
        {
            Id_str = id_str;
            Name = name;
            Email = email;
            PhoneNumber =phoneNumber;
            City=city;
            Street = street;
            HouseNumber = houseNumber;
        }
        public string ShortInfo()
        {
            return $"Név: {Name} \nVáros: {City} \nTelefonszám: {PhoneNumber} \nE-mail: {Email}";
        }
    }
}
