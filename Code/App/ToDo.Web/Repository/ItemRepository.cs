using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using ToDo.Web.Data;
using ToDo.Web.Helpers;

namespace ToDo.Web.Repository
{
    public interface IItemRepository
    {
        IEnumerable<Priority> GetPriorities();
        IEnumerable<Item> GetAllItems(string appUserId);
        Item GetItemById(string appUserId, int itemId);
        Item AddItem(string appUserId, Item newItem);
        Item UpdateItem(string appUserId, int itemId, Item newItem);
        bool DeleteItem(string appUserId, int ItemId);
        bool DeleteSubItem(string appUserId, int subItemId);
        SubItem GetSubItemById(string appUserId, int subItemId);
        SubItem AddSubItem(string appUserId, SubItem subItem);
    }
    public class ItemRepository : IItemRepository
    {
        private readonly ToDoContext _ctx;
        private ILogger<ItemRepository> _logger;

        public ItemRepository(ToDoContext ctx, ILogger<ItemRepository> logger)
        {
            ctx.ExtIfNullThrowException("ctx is null");
            _ctx = ctx;

            ctx.ExtIfNullThrowException("logger is null");
            _logger = logger;
        }

        public IEnumerable<Priority> GetPriorities()
        {
            return _ctx.Priorities.ToList();
        }

        public IEnumerable<Item> GetAllItems(string appUserId)
        {
            appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");

            var results = _ctx.Items
                .Where(i => i.AppUserId == appUserId)
                .Include(i => i.SubItems)
                .ToList();

            return results;
        }

        public Item GetItemById(string appUserId, int itemId)
        {
            appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");

            return _ctx.Items
                .Include(i => i.SubItems)
                .FirstOrDefault(i => i.AppUserId == appUserId && i.Id == itemId);
        }

        public Item AddItem(string appUserId, Item newItem)
        {
            try
            {
                appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");
                
                newItem.CreatedDate = DateTime.Now;
                newItem.AppUserId = appUserId;
                if (ValidateItem(newItem))
                {
                    _ctx.Items.Add(newItem);
                    return SaveAll() ? newItem : null;
                }
                return null;
            }
            catch (Exception ex)
            {
               _logger.LogError($"Error while adding Item: {ex}");
                return null;
            }
        }

        public Item UpdateItem(string appUserId, int itemId, Item newItem)
        {
            try
            {
                appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");

                if (newItem == null)
                    return null;

                Item existingItem = _ctx.Items.FirstOrDefault(i => i.AppUserId == appUserId && i.Id == itemId);
                if (existingItem == null)
                    return null;

                existingItem.Class = newItem.Class;
                if (existingItem.Status != 3 && newItem.Status == 3)
                    existingItem.CompletedOn = DateTime.Now;

                if (existingItem.Status == 3 && newItem.Status != 3)
                    existingItem.CompletedOn = null;

                existingItem.Description = newItem.Description;
                existingItem.DueBy = newItem.DueBy;
                existingItem.UpdatedDate = DateTime.Now;
                existingItem.Status = newItem.Status;
                existingItem.PriorityId = newItem.PriorityId;
                return SaveAll() ? existingItem : null;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while updating Item: {ex}");
                return null;
            }
        }

        private bool ValidateItem(Item newItem)
        {
            return true;
        }

        private bool SaveAll()
        {
            return _ctx.SaveChanges() > 0;
        }

        public bool DeleteItem(string appUserId, int itemId)
        {
            try
            {
                appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");
                
                var item = GetItemById(appUserId, itemId);
                if (item == null) return true;

                // delete subitems
                _ctx.SubItems.RemoveRange(entities: _ctx.SubItems.Where(si => si.ItemId == itemId).ToList());

                // delete item
                _ctx.Items.Remove(item);
                return SaveAll();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while deleting Item: {ex}");
                return false;
            }
        }

        public bool DeleteSubItem(string appUserId, int subItemId)
        {
            try
            {
                appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");
                
                var subItem = GetSubItemById(appUserId, subItemId);
                if (subItem == null)
                    return true;

                _ctx.SubItems.Remove(subItem);
                return SaveAll();
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while deleting sub Item: {ex}");
                return false;
            }
        }

        public SubItem GetSubItemById(string appUserId, int subItemId)
        {
            appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");
            
            var subItem = _ctx.SubItems.FirstOrDefault(si => si.Id == subItemId);
            if (subItem == null) return null;

            //validate user id belongs to subitem
            var item = _ctx.Items.FirstOrDefault(i => i.Id == subItem.ItemId);
            if (item == null) return null;

            return item.AppUserId == appUserId ? subItem : null;
        }

        public SubItem AddSubItem(string appUserId, SubItem subItem)
        {
            try
            {
                appUserId.ExtIfNullorWhitespaceThrowException("appUserId can not be null.");

                // check if subitem is not null
                if(subItem == null)
                    throw new ArgumentNullException("sub item can not be null.");

                // check that subitem's item still exists and it belongs to user
                var item = _ctx.Items.FirstOrDefault(i => i.Id == subItem.ItemId);
                if(item != null && item.AppUserId == appUserId)
                {
                    _ctx.SubItems.Add(subItem);
                    return SaveAll() ? subItem : null;
                }
                else
                {
                    throw new Exception("Invalid subitem.");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error while adding sub Item: {ex}");
                throw;
            }
        }

        private bool ValidateSubItem(SubItem subItem)
        {
            return true;
        }
    }
}
