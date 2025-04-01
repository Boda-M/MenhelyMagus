using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Habitat
    {
        [JsonPropertyName("id")]
        public string Id { get; set; } 
        [JsonPropertyName("name")]
        public string Name { get; set; }
        public Habitat(string id, string name)
        {
            Id = id;
            Name = name;
        }
        public override string ToString()
        {
            return Name.ToString();
        }
    }
}
