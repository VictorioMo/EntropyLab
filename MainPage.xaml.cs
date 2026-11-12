namespace EntropyLab
{
    using EntropyLab.Services;

    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            EntropyWebView.SetInvokeJavaScriptTarget(new RandomService());
        }
    }
}
