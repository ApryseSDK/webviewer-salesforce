public with sharing class ContentVersionController {
    @AuraEnabled(Cacheable=true)
    public static List<ContentVersion> getContentVersions() {
      return [SELECT Id, Title, FileExtension, IsMajorVersion, IsLatest, VersionData, IsAssetEnabled, LastModifiedDate
        FROM ContentVersion WHERE IsLatest = True];
    }

    @RemoteAction
    @AuraEnabled(Cacheable=true)
    public static Map<String,String> getFileBlobById(String Id) {
        ContentVersion cv = [SELECT Id, Title, FileExtension, IsMajorVersion, IsLatest, VersionData, IsAssetEnabled FROM ContentVersion WHERE Id = :Id];
        // Returns string
        Map<String,String> response = new Map<String, String>();
        response.put('Title', cv.Title);
        response.put('FileExtension', cv.FileExtension);
        response.put('Content', EncodingUtil.base64Encode(cv.VersionData));

        return response;
    }
}
