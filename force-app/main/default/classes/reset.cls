public with sharing class reset {
    
    public static void reset() {
        delete [select id from equipment__c];
        delete [select id from CollaborationGroupMember where CollaborationRole != 'Admin'];
        delete [select id from Learning_Topic__c];
        delete [select id from Assigned_Training__c];
        delete [select id from Case];

        Employee__c e = [select id, Status__c from Employee__c where first_name__c = 'Shalaya' and last_name__c = 'Shipman'];
        e.status__c = 'New Hire';
        e.Send_Notification__c = false;
        update e;
    }

    @InvocableMethod
    public static void EmployeeReset() {
        reset();
    }
}