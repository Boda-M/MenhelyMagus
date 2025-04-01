using System;
using System.Globalization;
using System.Windows.Data;

namespace MenhelyMagus_Kezelo.Converters
{
    public class ImagePathConverter : IValueConverter
    {
        public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
        {
            if (value is string baseName)
            {
                return $"/IMG/{baseName}.png"; 
            }
            return null; 
        }

        public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
        {
            throw new NotImplementedException();
        }
    }
}
