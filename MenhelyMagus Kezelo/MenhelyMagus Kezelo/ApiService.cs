using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json.Nodes;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Diagnostics;
using System.Net;
using System.Collections;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Windows.Controls.Primitives;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Markup;
using System.Windows.Media.Media3D;
using System.Xml.Linq;

namespace MenhelyMagus_Kezelo
{
    internal class ApiService
    {
        private static readonly HttpClient _httpClient = new HttpClient(new HttpClientHandler());
        static string base_URL = "http://localhost:10001/";

        private static HttpRequestMessage CreateRequest(HttpMethod method, string route, string jsonContent = null)
        {
            var request = new HttpRequestMessage(method, new Uri(base_URL + route));
            var token = App.Current.Properties["tokenSTR"];

            if (!string.IsNullOrEmpty(jsonContent))
            {
                jsonContent = jsonContent.Insert(jsonContent.Length - 1, $",\"token\":\"{token}\"");
                request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            }
            else
            {
                jsonContent = $"{{\"token\":\"{App.Current.Properties["tokenSTR"]}\"}}";
                request.Content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            }
            return request;
        }
        private static async Task<JsonElement> SendRequestAsync(HttpRequestMessage request)
        {
            try
            {
                HttpResponseMessage response = await _httpClient.SendAsync(request).ConfigureAwait(false);
                var content = await response.Content.ReadAsStringAsync();
                return JsonDocument.Parse(await response.Content.ReadAsStringAsync()).RootElement;
            }
            catch (Exception ex) 
            {
                Console.WriteLine($"{DateTime.Now}: \nUnexpected Error: {ex.Message}");
                return JsonDocument.Parse("{}").RootElement;
            }
        }

        public static async Task<JsonElement> GetAsync(string route, string jsonContent=null)
        {
            var request = CreateRequest(HttpMethod.Get, route);
            return await SendRequestAsync(request);
        }

        public static async Task<JsonElement> PostAsync(string route, string jsonContent)
        {
            var request = CreateRequest(HttpMethod.Post, route, jsonContent);
            return await SendRequestAsync(request);
        }

        public static async Task<JsonElement> PutAsync(string route, string jsonContent)
        {
            var request = CreateRequest(HttpMethod.Put, route, jsonContent);
            return await SendRequestAsync(request);
        }

        public static async Task<JsonElement> DeleteAsync(string route, string jsonContent=null)
        {
            var request = CreateRequest(HttpMethod.Delete, route,jsonContent);
            return await SendRequestAsync(request);
        }
        public static async Task<List<T>> GetAll<T>(string route,bool post=false,string jsonString=null)//post: some endpoints are coded as a POST instead of GET in the backend
        {
            List<T> list = new List<T>();
            JsonElement json;
            if (post) { json = await ApiService.PostAsync(route,jsonString); }
            else { json = await ApiService.GetAsync(route); }
            try
            {
                var data = json.GetProperty("data");
                list = JsonSerializer.Deserialize<List<T>>(data);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{DateTime.Now}:  Unexpected Error: {ex.Message}");
            }
            return list;
        }
        public static async Task<T> GetOne<T>(string route)
        {
            T entity=default(T);
            try
            {
                JsonElement json = await ApiService.GetAsync(route);
                if (json.TryGetProperty("data", out JsonElement data) && data.ValueKind == JsonValueKind.Object)
                {
                    entity = JsonSerializer.Deserialize<T>(data);
                }
                else
                {
                    //default return
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"{DateTime.Now}:  Unexpected Error: {ex.Message}");
            }
            return entity;
        }
    }
}
