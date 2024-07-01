const Author = require("../models/SectionModel");
const { sequelize } = require("../connection/connection");
const { Transaction } = require("sequelize");
const delAuthor = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const result = await Author.destroy(
      { where: { name: req.body.name } },
      { transaction: t }
    );
    await t.commit();
    res.send("section deleted");
  } catch (e) {
    console.log(e);
    await t.rollback();
    res.send("Error while deleting section");
  }
};

const demonstrateIsolation = async () => {
  // await Author.create({ name: "Initial Author" });

  // Start first transaction
  const t1 = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  });

  // Start second transaction
  const t2 = await sequelize.transaction({
    isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
  });

  try {
    // Transaction 1 reads the initial data
    const authorsT1 = await Author.findAll({ transaction: t1 });
    console.log(
      "Transaction 1 Initial Read:",
      authorsT1.map((a) => a.name)
    );

    // Transaction 2 attempts to insert a new author with a delay
    setTimeout(async () => {
      try {
        await Author.create({ name: "New Author T2" }, { transaction: t2 });
        await t2.commit();
        console.log("Transaction 2 Commit");
      } catch (e) {
        console.error(e);
        await t2.rollback();
      }
    }, 1000); // 1-second delay

    // Wait for a moment to let the other transaction proceed
    setTimeout(async () => {
      try {
        // Transaction 1 tries to read again after the delay
        const authorsT1After = await Author.findAll({ transaction: t1 });
        console.log(
          "Transaction 1 Second Read:",
          authorsT1After.map((a) => a.name)
        );
        // Transaction 1 attempts to insert another author
        await Author.create({ name: "New Author T1" }, { transaction: t1 });
        await t1.commit();
        console.log("Transaction 1 Commit");
      } catch (e) {
        console.error(e);
        await t1.rollback();
      }
    }, 2000); // 2-second delay
  } catch (e) {
    console.error(e);
    if (t1) await t1.rollback();
    if (t2) await t2.rollback();
  }
};

module.exports = { delAuthor, demonstrateIsolation };
