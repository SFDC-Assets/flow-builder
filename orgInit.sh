# sfdx shane:org:create -f config/project-scratch-def.json -d 30 -s --wait 60 --userprefix admin -o flowbuilder.demo
sfdx force:org:create -f config/project-scratch-def.json -s -d 3 -w 60
sfdx force:source:push
sfdx force:user:permset:assign -n FlowBuilder
sfdx shane:user:password:set -g User -l User -p salesforce1
sfdx force:apex:execute -f scripts/generateAccountOrder.apex
sfdx force:org:open
