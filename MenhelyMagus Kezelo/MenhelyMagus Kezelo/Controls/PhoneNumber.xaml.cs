using System.Text.RegularExpressions;
using System.Windows.Controls;
using System.Windows.Input;

namespace MenhelyMagus_Kezelo.Controls
{
    /// <summary>
    /// Interaction logic for Telefonszam.xaml 
    /// </summary>
    public partial class PhoneNumber : UserControl
    {
        public PhoneNumber()
        {
            InitializeComponent();
        }
        public void Validate(object sender, TextCompositionEventArgs e)
        {
            if (!Regex.IsMatch(e.Text, "[0-9]"))
            {
                e.Handled = true;
            }
        }
        public void OnTextChanged(object sender, TextChangedEventArgs e)
        {
            TextBox tb = sender as TextBox;
            if (tb != null)
            {
                string pastedText = tb.Text;
                // Remove any non-numeric characters
                tb.Text = Regex.Replace(pastedText, @"\D", "");
            }
        }
    }
}
