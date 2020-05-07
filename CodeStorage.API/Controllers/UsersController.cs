using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeStorage.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        [HttpGet]
        public IActionResult getUsers()
        {
            string[] s = {"123", "345", "456"};
            return Ok(s);
        }
    }
}