public with sharing class sampleDataCreation {

    public static void createData() { 

        Profile p = [SELECT Id FROM Profile WHERE Name='Standard User'];

        User u = new User(
            Alias= 'mperez',
            Email= 'perez@example.com',
            EmailEncodingKey= 'ISO-8859-1',
            LanguageLocaleKey= 'en_US',
            LastName= 'Perez',
            LocaleSidKey= 'en_US',
            TimeZoneSidKey= 'America/Los_Angeles',
            Username= 'mperez@example.com',
            ProfileId= p.Id
        );
 
        insert u;

        Applicant__c apl = 
            new Applicant__c(
                City__c= 'Las Vegas',
                Email__c= 'perez@example.com',
                First_Name__c= 'Maria',
                Last_Name__c= 'Perez',
                Name= 'Maria Perez',
                Phone__c= '(555) 583-4832',
                PostalCode__c= '89109',
                State__c= 'NV',
                Street_Address__c= '3570 S Las Vegas Blvd'
            );
 
        insert apl;

        Employee__c emp = 
            new Employee__c(
                Applicant_Record__c=apl.Id, 
                City__c='Las Vegas',
                Department__c='Hotel Operations',
                Email__c='perez@example.com', 
                First_Name__c='Maria',
                Last_Name__c='Perez',
                Name= 'Maria Perez',
                Phone__c= '(555) 583-4832',
                PostalCode__c= '89109',
                Role__c= 'Hotel Operations Manager',
                Send_Notification__c= true,
                // Start_Date__c= '2020-02-12',
                State__c='NV',
                Status__c= 'New Hire',
                Street_Address__c= '3570 S Las Vegas Blvd',
                User_Record__c = u.Id
            );

        insert emp;
    
        Equipment__c equip = new Equipment__c(
            Employee__c = emp.Id
        );

        insert equip;
    }
}
