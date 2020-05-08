using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using CodeStorage.API.Data;
using CodeStorage.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CodeStorage.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        private readonly DataContext database;
        private readonly ICodeStorageRepository codeStorageRepository;
        public DocumentsController(DataContext database, ICodeStorageRepository codeStorageRepository)
        {
            this.codeStorageRepository = codeStorageRepository;
            this.database = database;
        }

        [HttpGet]
        public async Task<IActionResult> GetDocuments()
        {
            // Get current user's id
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var documents = await codeStorageRepository.GetDocuments(userId);
            return Ok(documents);
        }

        [HttpGet("{documentId}")]
        public async Task<IActionResult> GetDocument(int documentId)
        {
            // Get current user's id
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            
            var document = await codeStorageRepository.GetDocument(documentId);
            if (document.UserId != userId)  // If the document is not this user's document
                return Unauthorized();

            return Ok(document);
        }

        [HttpPost("new")]
        public async Task<IActionResult> NewDocument()
        {
            // Get current user's id
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            Document newlyCreatedDocument = await codeStorageRepository.NewDocument(userId);
            await codeStorageRepository.SaveAll();

            return Ok(newlyCreatedDocument);
        }

        [HttpPut("update")]
        public async void UpdateDocument(Document document)
        {
            codeStorageRepository.UpdateDocument(document);
            await codeStorageRepository.SaveAll();
        }

        [HttpDelete("removeEmpty")]
        public void RemoveAllEmptyDocuments()
        {
            this.codeStorageRepository.RemoveAllEmptyDocuments();  
        }
    }
}