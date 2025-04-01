using System.Text.Json.Serialization;

namespace MenhelyMagus_Kezelo.Classes
{
    public class Token
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

        private string _user_id_str;

        [JsonPropertyName("userId")]
        public string UserId_str
        {
            get => _user_id_str;
            set
            {
                _user_id_str = value;
                UserId = int.TryParse(value, out var parsedId) ? parsedId : -1; // Set to -1 if parsing fails
            }
        }
        private int _userId;
        public int UserId
        {
            get => _userId;
            set
            {
                _userId = value;
            }
        }

        [JsonPropertyName("userType")]
        public string UserType { get; set; }
        [JsonPropertyName("token")]
        public string TokenSTR{ get; set; }

    }
}
