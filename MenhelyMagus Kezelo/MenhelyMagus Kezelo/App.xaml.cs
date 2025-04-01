using System;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Media3D;

namespace MenhelyMagus_Kezelo
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : System.Windows.Application
    {
        public static MainWindow MainAppWindow => Current.MainWindow as MainWindow;
        private void PasswordBox_GotFocus(object sender, RoutedEventArgs e)
        {
            if (sender is PasswordBox passwordBox)
            {
                var template = passwordBox.Template;
                if (template != null)
                {
                    var watermark = template.FindName("Watermark", passwordBox) as TextBlock;
                    watermark.Visibility = Visibility.Collapsed;
                }
            }
        }

        private void PasswordBox_LostFocus(object sender, RoutedEventArgs e)
        {
            if (sender is PasswordBox passwordBox && passwordBox.Password.Length == 0)
            {
                var template = passwordBox.Template;
                if (template != null)
                {
                    var watermark = template.FindName("Watermark", passwordBox) as TextBlock;
                    watermark.Visibility = Visibility.Visible;
                }
            }
        }
        private void OnRowPreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (sender is DataGridRow row)
            {
                var clickedElement = e.OriginalSource as DependencyObject;
                if (clickedElement != null && IsDirectClickOnRow(row, clickedElement))
                {
                    DataGrid parent = FindParentOf<DataGrid>(row);
                    if (row.IsSelected)
                    {
                        parent.UnselectAll();
                    }
                    else
                    {
                        parent.UnselectAll();//i only want one visible at a time
                        parent.SelectedItem = row.Item;
                        parent.CurrentCell = new DataGridCellInfo(row.Item, parent.Columns[0]);
                        parent.UpdateLayout();
                    }
                    e.Handled = true; 
                }
                else { e.Handled = false; }//if its not dirctly on the row it can do the deafult behaviour
            }
        }
        private T FindParentOf<T>(DependencyObject child) where T : DependencyObject
        {
            DependencyObject parent = VisualTreeHelper.GetParent(child);
            while (parent != null && !(parent is T))
            {
                parent = VisualTreeHelper.GetParent(parent);
            }
            return parent as T;
        }
        private bool IsDirectClickOnRow(DataGridRow row, DependencyObject clickedElement)
        {
            // Traverse the visual tree to check if the clicked element is part of the RowDetails
            while (clickedElement != null && clickedElement != row)
            {
                if(clickedElement is DataGridCellsPresenter) { return true; }
                if (clickedElement is Visual || clickedElement is Visual3D)
                {
                    clickedElement = VisualTreeHelper.GetParent(clickedElement);
                }
                if (clickedElement == null) //if parent isnt visual, but logical
                {
                    clickedElement = LogicalTreeHelper.GetParent(clickedElement);
                }
            }
            return false;
        }
        private void DataGrid_PreviewMouseWheel(object sender, MouseWheelEventArgs e)
        {
            DataGrid dg= sender as DataGrid;
            // Factor to change scroll sensitivity
            double scrollFactor = 0.2;  // Increase or decrease this value to control sensitivity

            // If you want to modify the vertical scrolling
            
            ScrollViewer scrollViewer = GetScrollViewer(dg);
            if (scrollViewer != null)
            {
                // Adjust the delta to modify scroll sensitivity
                double adjustedDelta = e.Delta * scrollFactor;

                scrollViewer.ScrollToVerticalOffset(scrollViewer.VerticalOffset - adjustedDelta);
            }
            e.Handled = true;
        }
                
        private ScrollViewer GetScrollViewer(DependencyObject parent)
        {
            // Traverse the visual tree to find the ScrollViewer
            for (int i = 0; i < VisualTreeHelper.GetChildrenCount(parent); i++)
            {
                var child = VisualTreeHelper.GetChild(parent, i);
                if (child is ScrollViewer scrollViewer)
                {
                    return scrollViewer;
                }

                // Recursively search in the child elements
                var result = GetScrollViewer(child);
                if (result != null)
                {
                    return result;
                }
            }

            return null;
        }

    }
}
