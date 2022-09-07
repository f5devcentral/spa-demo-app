import inventory from '../inventory.json' assert {type: 'json'};

const inventoryService = {
    getInventory() {
        return inventory;
    },
}

export default inventoryService;
