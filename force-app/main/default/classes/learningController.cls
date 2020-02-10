public with sharing class learningController {

    @AuraEnabled(cacheable=true)
    public static Learning_Topic__c getRelatedLearningTopic(String recordId) {
        Learning_Topic__c topic = [SELECT Id FROM Learning_Topic__c WHERE Learning_Module__c = :recordId LIMIT 1];
        return topic;
    }

    @AuraEnabled(cacheable=false)
    public static Assigned_Training__c getLearningModule(String recordId) {
        Assigned_Training__c module = [SELECT Id, Complete__c FROM Assigned_Training__c WHERE Id = :recordId LIMIT 1];
        return module;
    }

    @AuraEnabled(cacheable=true)
    public static Assigned_Training__c getParentLearningModule(String recordId) {
        Learning_Topic__c topic = [SELECT Id, Learning_Module__c FROM Learning_Topic__c WHERE Id = :recordId LIMIT 1];
        Assigned_Training__c module = [SELECT Id FROM Assigned_Training__c WHERE Id = :topic.Learning_Module__c LIMIT 1];
        return module;
    }    

    @AuraEnabled(cacheable=false)
    public static void updateLearningModule(String recordId, Boolean complete) {
        Assigned_Training__c module = [SELECT Id, Complete__c FROM Assigned_Training__c WHERE Id = :recordId LIMIT 1];
        module.Complete__c = complete;
        update module;
    }

}