using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDo.Web.Data;

namespace ToDo.Web.Repository
{
    public interface IItemRepository
    {
        IEnumerable<Priority> GetPriorities();
        IEnumerable<Item> GetAllItems(int userId);
        Item GetItemById(int userId, int itemId);
        Item AddItem(int userId, Item newItem);
        Item UpdateItem(int userId, int itemId, Item newItem);
        bool DeleteItem(int userId, int ItemId);
        bool DeleteSubItem(int userId, int subItemId);
        SubItem GetSubItemById(int userId, int subItemId);
        SubItem AddSubItem(int userId, SubItem subItem);
    }
    public class ItemRepository : IItemRepository
    {
        private readonly ToDoContext _ctx;

        public ItemRepository(ToDoContext ctx)
        {
            if (ctx == null)
                throw new NullReferenceException("ctx is null");

            this._ctx = ctx;
        }

        public IEnumerable<Priority> GetPriorities()
        {
            return _ctx.Priorities.ToList();
        }

        public IEnumerable<Item> GetAllItems(int userId)
        {
            var results = _ctx.Items
                .Where(i => i.UserId == userId)
                .Include(i => i.SubItems)
                .ToList();

            return results;
        }

        public Item GetItemById(int userId, int itemId)
        {
            return _ctx.Items
                .Include(i => i.SubItems)
                .FirstOrDefault(i => i.UserId == userId && i.Id == itemId);
        }

        public Item AddItem(int userId, Item newItem)
        {
            try
            {
                newItem.UserId = userId;
                newItem.CreatedDate = DateTime.Now;
                if (ValidateItem(newItem))
                {
                    _ctx.Items.Add(newItem);
                    return SaveAll() ? newItem : null;
                }
                return null;
            }
            catch (Exception ex)
            {
                // Log exception
                return null;
            }
        }

        public Item UpdateItem(int userId, int itemId, Item newItem)
        {
            try
            {
                if (newItem == null)
                    return null;

                Item existingItem = _ctx.Items.FirstOrDefault(i => i.UserId == userId && i.Id == itemId);
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
                // Log exception
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

        public bool DeleteItem(int userId, int itemId)
        {
            try
            {
                var item = GetItemById(userId, itemId);
                if (item == null) return true;

                // delete subitems
                _ctx.SubItems.RemoveRange(entities: _ctx.SubItems.Where(si => si.ItemId == itemId).ToList());

                // delete item
                _ctx.Items.Remove(item);
                return SaveAll();
            }
            catch (Exception ex)
            {
                // Log Exception
                return false;
            }
        }

        public bool DeleteSubItem(int userId, int subItemId)
        {
            try
            {
                var subItem = GetSubItemById(userId, subItemId);
                if (subItem == null)
                    return true;

                _ctx.SubItems.Remove(subItem);
                return SaveAll();
            }
            catch (Exception ex)
            {
                // Log Exception
                return false;
            }
        }

        public SubItem GetSubItemById(int userId, int subItemId)
        {
            var subItem = _ctx.SubItems.FirstOrDefault(si => si.Id == subItemId);
            if (subItem == null) return null;

            //validate user id belongs to subitem
            var item = _ctx.Items.FirstOrDefault(i => i.Id == subItem.ItemId);
            if (item == null) return null;

            return item.UserId == userId ? subItem : null;
        }

        public SubItem AddSubItem(int userId, SubItem subItem)
        {
            try
            {
                if (ValidateSubItem(subItem))
                {
                    _ctx.SubItems.Add(subItem);
                    return SaveAll() ? subItem : null;
                }
                return null;
            }
            catch (Exception ex)
            {
                // Log exception
                return null;
            }
        }

        private bool ValidateSubItem(SubItem subItem)
        {
            return true;
        }
    }
}
