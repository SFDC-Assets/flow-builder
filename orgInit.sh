sf demoutil org create scratch -f config/project-scratch-def.json -d 30 -s -w 60 -p flow -e builder.demo
sf project deploy start
sf org assign permset -n FlowBuilder
sf demoutil user password set -p salesforce1 -g User -l User
sf apex run -f scripts/generateAccountOrder.apex
sf org open
