using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeStorage.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CodeStorage.API.Data
{
    public class CodeStorageRepository : ICodeStorageRepository
    {
        private readonly DataContext database;
        public CodeStorageRepository(DataContext database)
        {
            this.database = database;

        }
        public async Task<Document> NewDocument(int userId)
        {
            Document document = new Document(userId);
            await database.Documents.AddAsync(document);
            return document;
        }

        public async Task<Document> GetDocument(int documentId)
        {
            return await database.Documents.FirstOrDefaultAsync(d => d.Id == documentId);
        }

        public async Task<IEnumerable<Document>> GetDocuments(int userId)
        {
            return await database.Documents.Where(d => d.UserId == userId).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await database.SaveChangesAsync() > 0;
        }

        public async void UpdateDocument(Document document)
        {
            Document original = await database.Documents.FirstOrDefaultAsync(d => d.Id == document.Id);
            original.Content = document.Content;
            original.Title = document.Title;
        }

        public void RemoveAllEmptyDocuments()
        {
            var documents = database.Documents.Where(d => (d.Title=="" && d.Content=="")).ToList();
            foreach(Document d in documents)
            {
                database.Documents.Remove(d);
            }
            database.SaveChanges();
        }
    }
}