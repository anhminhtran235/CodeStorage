using System;
using System.Threading.Tasks;
using CodeStorage.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeStorage.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext database;
        public AuthRepository(DataContext database)
        {
            this.database = database;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await database.Users.FirstOrDefaultAsync(x => x.Name == username);

            if(user == null)
                return null;

            if(!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if(computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHashandSalt(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await database.Users.AddAsync(user);
            await database.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHashandSalt(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await database.Users.AnyAsync(x => x.Name == username))
                return true;
            return false;
        }
    }
}