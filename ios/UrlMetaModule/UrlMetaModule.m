//
//  UrlMeta.m
//  url_preview
//
//  Created by 규현백 on 8/13/25.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(UrlMeta, NSObject)
RCT_EXTERN_METHOD(parseMetaData:(NSString *)url callback:(RCTResponseSenderBlock)callback)
@end
