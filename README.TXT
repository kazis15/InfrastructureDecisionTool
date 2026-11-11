INFRASTRUCTURE DECISION TOOL

PROJECT DESCRIPTION
This program is built using Node.js and JavaScript. It contains two tools: a Subnet Host Checker and a Compute Environment Selector. The purpose of this program is to help users make basic infrastructure decisions based on network requirements, application usage, and budget.

REQUIREMENTS
- Node.js
- readline-sync package

HOW TO RUN THE PROGRAM
1. Open the project folder in VS Code.
2. Open the terminal.
3. Install the required package by entering: npm install
4. Run the program by entering: node info300.js
5. Choose an option from the main menu.

TOOL 1: SUBNET HOST CHECKER
The Subnet Host Checker asks the user for a VPC CIDR, subnet CIDR, and the number of devices required.

It checks whether the subnet CIDR is consistent with the VPC CIDR and calculates the number of available IP addresses. AWS reserves 5 IP addresses in each subnet, so the program subtracts 5 from the total number of addresses.

Example 1 – Sufficient Subnet:
- VPC CIDR: /16
- Subnet CIDR: /24
- Devices required: 200
- Total IP addresses: 256
- Usable IP addresses: 251
- Unused IP addresses: 51

Result: The subnet is sufficient.

Example 2 – Insufficient Subnet:
- VPC CIDR: /16
- Subnet CIDR: /24
- Devices required: 300
- Total IP addresses: 256
- Usable IP addresses: 251
- Additional IP addresses needed: 49

Result: The subnet is not sufficient.

TOOL 2: COMPUTE ENVIRONMENT SELECTOR
The Compute Environment Selector asks the user for an application name, monthly users, monthly budget, and whether high availability is required.

Based on the information provided, the program recommends one of three architectures:

- Fewer than 1,000 users with no high availability: Single EC2.
- Between 1,000 and 10,000 users: EC2 + Load Balancer.
- More than 10,000 users or high availability required: EC2 + Load Balancer + Auto Scaling.

The program also displays budget warnings based on the recommended architecture.

INPUT VALIDATION
The program checks user inputs to prevent invalid entries. It validates CIDR prefixes, device counts, application names, monthly users, budgets, and high availability responses.

AUTHOR
Infrastructure Decision Tool Project
