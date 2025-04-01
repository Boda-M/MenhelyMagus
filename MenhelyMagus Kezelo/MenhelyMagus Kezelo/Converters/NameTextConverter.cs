using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace MenhelyMagus_Kezelo.Converters
{
    public class NameTextConverter : IMultiValueConverter
    {
        public object Convert(object[] value, Type targetType, object parameter, CultureInfo culture)
        {

            //if (value[0] == null) { value[0] = string.Empty; }
            string name = value[0].ToString();
            string text = value[1].ToString();
            if (name.Equals(text))
            {
                return "equal";
            }
            if (text == "")
            {
                return "emptyText";
            }
            else return "notEqual";
           
        }
        public object[] ConvertBack(object value, Type[] targetType, object parameter, CultureInfo culture)
        {
            throw new NotSupportedException();
        }
    }
}
