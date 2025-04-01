using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Breed
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("speciesId")]
        public string SpeciesId { get; set; }
        public Species Species { get; set; }
        public override string ToString() {
            return Name;
        }
    }
}
