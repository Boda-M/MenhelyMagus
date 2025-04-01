using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Species
    {
        [JsonPropertyName("id")]
        public string Id{get; set;}
        [JsonPropertyName("name")]
        public string Name { get; set;}
        public List<Breed> Breeds { get; set;}
        public List<Vaccine> Vaccines { get; set; }
        public Species(string id, string name)
        {
            Id = id;
            Name = name;
            Breeds = new List<Breed>();
            Vaccines = new List<Vaccine>();
        }
        public override string ToString()
        {
            return Name.ToString();
        }
    }
}
