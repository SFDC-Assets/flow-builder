public with sharing class sampleDataCreation {

    public static void createData() { 

        Applicant__c apl = 
            new Applicant__c(
                City__c= 'Las Vegas',
                Email__c= 'perez@caesars.com',
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
                // City__c='Las Vegas',
                Department__c='Hotel Operations',
                // Email__c='shalaya@caesars.com', 
                // First_Name__c='Shalaya',
                // Last_Name__c='Shipman',
                Name= 'Maria Perez',
                // Phone__c= '(555) 583-4832',
                // PostalCode__c= '89109',
                Role__c= 'Hotel Operations Manager',
                Send_Notification__c= true,
                // Start_Date__c= '2020-02-12',
                // State__c='NV',
                Status__c= 'Setup'
                // Street_Address__c= '3570 S Las Vegas Blvd'
            );

        insert emp;
    }
}
