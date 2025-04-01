using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Vaccine
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        public override string ToString()
        {
            return Name.ToString();
        }
    }
}
