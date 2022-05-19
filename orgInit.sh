sfdx force:org:create -f config/project-scratch-def.json -s -d 30 -w 60
sfdx force:source:push
sfdx force:user:permset:assign -n FlowBuilder
sfdx shane:user:password:set -g User -l User -p salesforce1
sfdx force:apex:execute -f scripts/generateAccountOrder.apex
sfdx force:org:open