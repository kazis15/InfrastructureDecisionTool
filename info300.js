
const readline = require("readline-sync");

// Part A: Subnet Host Checker
function subnetHostChecker() {
    console.log("\n=================================");
    console.log("       SUBNET HOST CHECKER");
    console.log("=================================");

    // Get VPC CIDR
    let vpcCIDR;
    while (true) {
        vpcCIDR = readline.question("Enter VPC CIDR (example: /16): ").trim();

        if (/^\/?(1[6-9]|2[0-9]|30)$/.test(vpcCIDR)) {
            break;
        } else {
            console.log("Invalid CIDR. Enter a value between /16 and /30.");
        }
    }

    // Get Subnet CIDR
    let subnetCIDR;
    while (true) {
        subnetCIDR = readline.question("Enter Subnet CIDR (example: /24): ").trim();

        if (/^\/?(1[6-9]|2[0-9]|30)$/.test(subnetCIDR)) {
            break;
        } else {
            console.log("Invalid CIDR. Enter a value between /16 and /30.");
        }
    }

    // Get number of devices
    let devices;
    while (true) {
        devices = Number(readline.question("Enter number of devices required: "));

        if (Number.isInteger(devices) && devices > 0) {
            break;
        } else {
            console.log("Invalid input. Enter a positive whole number.");
        }
    }

    // Convert CIDR values to numbers
    let vpcPrefix = parseInt(vpcCIDR.replace("/", ""));
    let subnetPrefix = parseInt(subnetCIDR.replace("/", ""));

    // Check if subnet is consistent with VPC
    console.log("\n---------- RESULTS ----------");

    if (subnetPrefix > vpcPrefix) {
        console.log("Subnet CIDR is consistent with the VPC CIDR.");
    } else {
        console.log("Subnet CIDR is NOT consistent with the VPC CIDR.");
        console.log("The subnet must have a larger prefix number than the VPC.");
    }

    // Calculate total IP addresses
    let totalIPs = Math.pow(2, 32 - subnetPrefix);

    // AWS reserves 5 IP addresses in every subnet
    let usableIPs = Math.max(0, totalIPs - 5);

    console.log("Total IP addresses: " + totalIPs);
    console.log("Usable IP addresses (after AWS reserves 5): " + usableIPs);
    console.log("Devices required: " + devices);

    // Check whether subnet has enough IP addresses
    if (devices <= usableIPs) {
        let unusedIPs = usableIPs - devices;

        console.log("Result: The subnet IS sufficient.");
        console.log("Unused IP addresses: " + unusedIPs);
    } else {
        let additionalIPs = devices - usableIPs;

        console.log("Result: The subnet is NOT sufficient.");
        console.log("Additional IP addresses needed: " + additionalIPs);
    }
}
// Part B: Compute Environment Selector
function computeEnvironmentSelector() {
    console.log("\n=================================");
    console.log("   COMPUTE ENVIRONMENT SELECTOR");
    console.log("=================================");

    // Get application name
    let appName;

    while (true) {
        appName = readline.question("Enter application name: ").trim();

        if (appName.length > 0) {
            break;
        } else {
            console.log("Application name cannot be empty.");
        }
    }

    // Get monthly users
    let monthlyUsers;

    while (true) {
        monthlyUsers = Number(readline.question("Enter monthly users: "));

        if (Number.isInteger(monthlyUsers) && monthlyUsers >= 0) {
            break;
        } else {
            console.log("Enter a valid positive whole number.");
        }
    }

    // Get monthly budget
    let budget;

    while (true) {
        budget = Number(readline.question("Enter monthly budget in dollars: "));

        if (Number.isFinite(budget) && budget > 0) {
            break;
        } else {
            console.log("Enter a valid budget greater than zero.");
        }
    }

    // Get high availability requirement
    let highAvailability;

    while (true) {
        highAvailability = readline.question(
            "Does the application require high availability? (yes/no): "
        ).trim().toLowerCase();

        if (highAvailability === "yes" || highAvailability === "no") {
            break;
        } else {
            console.log("Please enter yes or no.");
        }
    }

    // Determine recommended architecture
    let architecture;
    let requiresAutoScaling = false;
    let requiresMoreThanSingleEC2 = false;

    if (monthlyUsers > 10000 || highAvailability === "yes") {
        architecture = "EC2 + Load Balancer + Auto Scaling";
        requiresAutoScaling = true;
        requiresMoreThanSingleEC2 = true;
    }
    else if (monthlyUsers >= 1000 && monthlyUsers <= 10000) {
        architecture = "EC2 + Load Balancer";
        requiresMoreThanSingleEC2 = true;
    }
    else {
        architecture = "Single EC2";
    }

    // Display results
    console.log("\n========== RESULTS ==========");
    console.log("Application: " + appName);
    console.log("Monthly users: " + monthlyUsers);
    console.log("Monthly budget: $" + budget.toFixed(2));
    console.log("High availability: " + highAvailability);
    
    console.log("\nRecommended Architecture:");
    console.log(architecture);

    // Check budget warnings
    console.log("\n========== BUDGET CHECK ==========");

    if (budget < 1000 && requiresMoreThanSingleEC2) {
        console.log("WARNING: Your budget is under $1,000.");
        console.log("The recommended architecture requires more than a single EC2 instance.");
    }
    else if (budget >= 1000 && budget <= 3000 && requiresAutoScaling) {
        console.log("WARNING: Your budget is between $1,000 and $3,000.");
        console.log("The recommended architecture requires Auto Scaling.");
    }
    else {
        console.log("No budget warning based on the assignment guidelines.");
    }
}
// Main program menu
function main() {
    let continueProgram = true;

    while (continueProgram) {
        console.log("\n=================================");
        console.log("   INFRASTRUCTURE DECISION TOOL");
        console.log("=================================");
        console.log("1. Subnet Host Checker");
        console.log("2. Compute Environment Selector");
        console.log("3. Exit");

        let choice = readline.question("Choose an option (1-3): ");

        if (choice === "1") {
            subnetHostChecker();
        } 
        else if (choice === "2") {
    computeEnvironmentSelector();
        } 
        else if (choice === "3") {
            console.log("\nThank you for using the program. Goodbye!");
            continueProgram = false;
        } 
        else {
            console.log("\nInvalid choice. Please enter 1, 2, or 3.");
        }
    }
}

// Start the program
main();


