using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Threading;

namespace MenhelyMagus_Kezelo.Controls
{
    public partial class MultiSelectComboBox : UserControl, INotifyPropertyChanged
    {
        private bool _isDropdownOpen;
        private bool _canReopen = true;
        private ObservableCollection<object> _items;

        public event PropertyChangedEventHandler PropertyChanged;
        public event EventHandler<SelectionChangedEventArgs> CustomSelectionChanged;

        private ScrollViewer _parentScrollViewer;
        public List<object> SelectedItems { get; set; } = new List<object>();

        public string SelectedItemsDisplay
        {

            get => string.Join(", ", ItemsListBox.SelectedItems);

        }
        public bool IsDropdownOpen
        {
            get => _isDropdownOpen;
            set
            {
                if (value==true) //open
                {
                    _isDropdownOpen = value;
                    OnPropertyChanged();
                    ItemsListBox.Focus();
                }
                else //close
                {
                    _isDropdownOpen = value;
                    _canReopen = false;
                    DispatcherTimer timer = new DispatcherTimer
                    {
                        Interval = TimeSpan.FromMilliseconds(200) 
                    };
                    timer.Tick += (s, args) =>
                    {
                        _canReopen = true;
                        timer.Stop();
                    };
                    timer.Start();
                    OnPropertyChanged();
                }
            }
        }
        public ObservableCollection<object> Items
        {
            get => _items;
            set
            {
                if (_items != value)
                {
                    _items = value;
                    OnPropertyChanged();
                }
            }
        }

        public MultiSelectComboBox()
        {
            InitializeComponent();
            DataContext = this;
            this.Loaded += MultiSelectComboBox_Loaded;
        }
        //----------setting some custom style
        public static readonly DependencyProperty TagProperty =
        DependencyProperty.Register(
            nameof(ControlTag),
            typeof(string),
            typeof(MultiSelectComboBox),
            new PropertyMetadata(null));

        public string ControlTag
        {
            get => (string)GetValue(TagProperty);
            set => SetValue(TagProperty, value);
        }

        public static readonly DependencyProperty TextBoxPaddingProperty =
           DependencyProperty.Register(
               nameof(TextBoxPadding),
               typeof(Thickness),
               typeof(MultiSelectComboBox),
               new PropertyMetadata(new Thickness(5,10,5,5))); // Default padding

        public Thickness TextBoxPadding
        {
            get => (Thickness)GetValue(TextBoxPaddingProperty);
            set => SetValue(TextBoxPaddingProperty, value);
        }
        private void MultiSelectComboBox_Loaded(object sender, RoutedEventArgs e)
        {
            // Set Tag to the control's name if not explicitly set
            if (string.IsNullOrEmpty(ControlTag))
            {
                ControlTag = this.Name;
            }
        }
        //----------
        private void TogglePopup(object sender, RoutedEventArgs e)
        {
            if (_canReopen&&Items != null && Items.Count > 0)
            {
                IsDropdownOpen = true;
            }
        }

        public void ItemsListBox_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            foreach (var addedItem in e.AddedItems)
            {
                if (!ItemsListBox.SelectedItems.Contains(addedItem))
                    ItemsListBox.SelectedItems.Add(addedItem);
            }
            foreach (var removedItem in e.RemovedItems)
            {
                ItemsListBox.SelectedItems.Remove(removedItem);
            }
            
            SelectedItemsTextBox.Text = "";
            SelectedItemsTextBox.Text = string.Join(", ", ItemsListBox.SelectedItems.Cast<object>().Select(item => item.ToString()));

            FormattedText formattedText = new FormattedText(SelectedItemsTextBox.Text, System.Globalization.CultureInfo.CurrentCulture,
                SelectedItemsTextBox.FlowDirection,
                new Typeface(SelectedItemsTextBox.FontFamily, SelectedItemsTextBox.FontStyle, SelectedItemsTextBox.FontWeight, SelectedItemsTextBox.FontStretch),
                SelectedItemsTextBox.FontSize,
                Brushes.Black, 
                VisualTreeHelper.GetDpi(this).PixelsPerDip);
            if (formattedText.Width > (SelectedItemsTextBox.ActualWidth-40))
            {
                if (SelectedItemsTextBox.ActualWidth > 200) SelectedItemsTextBox.Text=$"{ItemsListBox.SelectedItems.Count.ToString()} kiválasztott elem";
                else SelectedItemsTextBox.Text = $"{ItemsListBox.SelectedItems.Count.ToString()} kiv. elem";
            }
            CustomSelectionChanged?.Invoke(this, e);
        }

        public void SetDefaultSelectedItems<T>(List<T> old)
        {
            List<object> overlap = this.Items.Where(x => old.Any(y => ((T)x).ToString() == y.ToString())).ToList();
            ItemsListBox_SelectionChanged(Selector.SelectionChangedEvent, new SelectionChangedEventArgs(Selector.SelectionChangedEvent, new List<object>(), overlap));
        }
       
        protected void OnPropertyChanged([CallerMemberName] string propertyName = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }

        //when dropdown is open you cant scroll ("at all") [priority 2.]
        protected override void OnMouseWheel(MouseWheelEventArgs e)
        {
            if (IsDropdownOpen)
            {
                e.Handled = true;
            }
            else { base.OnPreviewMouseWheel(e); }
        }
        //but when you hover the element you can again [priority 1.]
        protected override void OnPreviewMouseWheel(MouseWheelEventArgs e)
        {
            if (IsDropdownOpen)
            {
                e.Handled = false;
            }
            else { base.OnPreviewMouseWheel(e); }
        }

    }
}