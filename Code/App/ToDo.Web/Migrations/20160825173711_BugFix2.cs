using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ToDo.Web.Migrations
{
    public partial class BugFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Items_PriorityId",
                table: "Items",
                column: "PriorityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Items_Priorities_PriorityId",
                table: "Items",
                column: "PriorityId",
                principalTable: "Priorities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Items_Priorities_PriorityId",
                table: "Items");

            migrationBuilder.DropIndex(
                name: "IX_Items_PriorityId",
                table: "Items");
        }
    }
}
