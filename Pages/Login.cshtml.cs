using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyWebApp.Pages;

public class LoginModel : PageModel
{
    private readonly ILogger<LoginModel> _logger;

    public LoginModel(ILogger<LoginModel> logger)
    {
        _logger = logger;
    }

    public void OnGet()
    {

    }

    [BindProperty]
    public string Username { get; set; }

    [BindProperty]
    public string Password { get; set; }

    public IActionResult OnPost()
    {
        if(IsValidUser(Username, Password))
        {
            return RedirectToPage("/Delivery");
        }
        else
        {
            ViewData["Error"] = "Invalid username or password.";
            return Page();
        }
    }

    private bool IsValidUser(string username, string password)
    {
        // Placeholder: Replace with your actual authentication logic
        return username == "admin" && password == "password";
    }
}
