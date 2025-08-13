//
//  UrlMeta.swift
//  url_preview
//
//  Created by 규현백 on 8/13/25.
//

import Foundation
import SwiftSoup

@objc(UrlMeta)
class UrlMeta: NSObject {
  @objc
  static func requiresMainQueueSetup() -> Bool { return true }


  @objc func parseMetaData(_ url: String, callback: @escaping RCTResponseSenderBlock) -> Void {

    DispatchQueue.global(qos: .userInteractive).async {
      guard let urlAddress = URL(string:url) else {return}
        do{
          let html = try String( contentsOf: urlAddress, encoding: .utf8)
          let doc: Document = try SwiftSoup.parse(html)
          var title : Optional<String> = nil
          var image : Optional<String> = nil
          var description : Optional<String> = nil

          do {
            let titleEl:Element? = try doc.head()?.select("meta[property~=(og:title|twitter:title)]").first()
            title = try titleEl?.attr("content")
          } catch _ {
            title = nil
          }
          do {
            let imageEl:Element?  = try doc.head()?.select("meta[property~=(og:image|twitter:image)]").first()
            image = try imageEl?.attr("content")
          } catch _ {
            image = nil
          }

          do {
            let descriptionEl:Element? = try doc.head()?.select("meta[property~=(og:description|twitter:description)]").first()
            description = try descriptionEl?.attr("content")
          } catch _ {
            description = nil
          }
          callback([image,title,description])
        } catch let error {
          callback([null,null,null])
          print(url)
          print(error)
        }
    }

  }
}
