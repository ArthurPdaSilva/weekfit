using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class weeklyworkout : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeeklyWorkout",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Sunday = table.Column<int>(type: "integer", nullable: false),
                    Monday = table.Column<int>(type: "integer", nullable: false),
                    Tuesday = table.Column<int>(type: "integer", nullable: false),
                    Wednesday = table.Column<int>(type: "integer", nullable: false),
                    Thursday = table.Column<int>(type: "integer", nullable: false),
                    Friday = table.Column<int>(type: "integer", nullable: false),
                    Saturday = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyWorkout", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeeklyWorkout_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyWorkout_UserId",
                table: "WeeklyWorkout",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeeklyWorkout");
        }
    }
}
