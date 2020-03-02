Account account = [SELECT Id FROM Account WHERE Name = 'Dickenson plc'];
Map<String, Object> params = new Map<String, Object>();
params.put('recordId', account.Id);
Flow.Interview.Generate_Account_Order generateAccountOrder = new Flow.Interview.Generate_Account_Order(params);
generateAccountOrder.start();